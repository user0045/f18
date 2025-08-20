
-- Create content_issues table
CREATE TABLE IF NOT EXISTS content_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('Movie', 'Web Series', 'Show')),
    content_id VARCHAR(255) NOT NULL,
    season_number INTEGER NULL,
    episode_number INTEGER NULL,
    description TEXT NULL CHECK (LENGTH(description) <= 1000),
    user_ip INET NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_issues_user_ip ON content_issues(user_ip);
CREATE INDEX IF NOT EXISTS idx_content_issues_content_id ON content_issues(content_id);
CREATE INDEX IF NOT EXISTS idx_content_issues_created_at ON content_issues(created_at);
CREATE INDEX IF NOT EXISTS idx_content_issues_status ON content_issues(status);

-- Create function to check user rate limits
CREATE OR REPLACE FUNCTION check_content_issue_rate_limit(
    p_user_ip INET,
    p_content_id VARCHAR(255)
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    total_requests_2h INTEGER;
    content_requests_1h INTEGER;
    result JSONB;
BEGIN
    -- Check total requests in last 2 hours
    SELECT COUNT(*)
    INTO total_requests_2h
    FROM content_issues
    WHERE user_ip = p_user_ip
    AND created_at >= NOW() - INTERVAL '2 hours';

    -- Check requests for specific content in last 1 hour
    SELECT COUNT(*)
    INTO content_requests_1h
    FROM content_issues
    WHERE user_ip = p_user_ip
    AND content_id = p_content_id
    AND created_at >= NOW() - INTERVAL '1 hour';

    result := jsonb_build_object(
        'can_submit', (total_requests_2h < 5 AND content_requests_1h < 1),
        'total_requests_2h', total_requests_2h,
        'content_requests_1h', content_requests_1h,
        'max_total', 5,
        'max_content', 1
    );

    RETURN result;
END;
$$;

-- Create function to insert content issue with rate limiting
CREATE OR REPLACE FUNCTION insert_content_issue(
    p_content_title VARCHAR(255),
    p_content_type VARCHAR(50),
    p_content_id VARCHAR(255),
    p_user_ip INET,
    p_season_number INTEGER DEFAULT NULL,
    p_episode_number INTEGER DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    rate_limit_check JSONB;
    new_issue_id UUID;
    result JSONB;
BEGIN
    -- Check rate limits
    rate_limit_check := check_content_issue_rate_limit(p_user_ip, p_content_id);
    
    IF NOT (rate_limit_check->>'can_submit')::BOOLEAN THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Rate limit exceeded',
            'rate_limit_info', rate_limit_check
        );
    END IF;

    -- Insert the issue
    INSERT INTO content_issues (
        content_title,
        content_type,
        content_id,
        season_number,
        episode_number,
        description,
        user_ip
    )
    VALUES (
        p_content_title,
        p_content_type,
        p_content_id,
        p_season_number,
        p_episode_number,
        p_description,
        p_user_ip
    )
    RETURNING id INTO new_issue_id;

    result := jsonb_build_object(
        'success', true,
        'issue_id', new_issue_id,
        'message', 'Content issue submitted successfully'
    );

    RETURN result;
END;
$$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_content_issues_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_content_issues_updated_at ON content_issues;
CREATE TRIGGER trigger_update_content_issues_updated_at
    BEFORE UPDATE ON content_issues
    FOR EACH ROW
    EXECUTE FUNCTION update_content_issues_updated_at();
