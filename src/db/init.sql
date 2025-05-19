-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    priority VARCHAR(50) NOT NULL DEFAULT 'medium',
    agency VARCHAR(100) NOT NULL,
    user_email VARCHAR(255),
    user_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create complaint updates table
CREATE TABLE IF NOT EXISTS complaint_updates (
    id SERIAL PRIMARY KEY,
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    message TEXT NOT NULL
);

-- Create agencies table
CREATE TABLE IF NOT EXISTS agencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    categories TEXT[] NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    operating_hours JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_complaint_updates_complaint_id') THEN
        CREATE INDEX idx_complaint_updates_complaint_id ON complaint_updates(complaint_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_complaints_status') THEN
        CREATE INDEX idx_complaints_status ON complaints(status);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_complaints_category') THEN
        CREATE INDEX idx_complaints_category ON complaints(category);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_complaints_agency') THEN
        CREATE INDEX idx_complaints_agency ON complaints(agency);
    END IF;
END $$;

-- Insert default agencies
DO $$
BEGIN
    -- Department of Public Works
    IF NOT EXISTS (SELECT 1 FROM agencies WHERE name = 'Department of Public Works') THEN
        INSERT INTO agencies (name, description, categories, contact_email, contact_phone, address, operating_hours)
        VALUES ('Department of Public Works', 'Handles road maintenance and infrastructure', ARRAY['Road Maintenance', 'Infrastructure'], 'publicworks@city.gov', '+1234567890', '123 Main St, City Hall', '{"weekdays": "8:00 AM - 5:00 PM", "weekends": "Closed"}');
    END IF;

    -- Transportation Authority
    IF NOT EXISTS (SELECT 1 FROM agencies WHERE name = 'Transportation Authority') THEN
        INSERT INTO agencies (name, description, categories, contact_email, contact_phone, address, operating_hours)
        VALUES ('Transportation Authority', 'Manages public transport and traffic', ARRAY['Public Transport', 'Traffic'], 'transport@city.gov', '+1234567891', '456 Transit Ave', '{"weekdays": "7:00 AM - 7:00 PM", "weekends": "9:00 AM - 5:00 PM"}');
    END IF;

    -- Sanitation Department
    IF NOT EXISTS (SELECT 1 FROM agencies WHERE name = 'Sanitation Department') THEN
        INSERT INTO agencies (name, description, categories, contact_email, contact_phone, address, operating_hours)
        VALUES ('Sanitation Department', 'Handles waste management and cleaning', ARRAY['Waste Management', 'Cleaning'], 'sanitation@city.gov', '+1234567892', '789 Clean St', '{"weekdays": "6:00 AM - 6:00 PM", "weekends": "7:00 AM - 3:00 PM"}');
    END IF;

    -- General Services
    IF NOT EXISTS (SELECT 1 FROM agencies WHERE name = 'General Services') THEN
        INSERT INTO agencies (name, description, categories, contact_email, contact_phone, address, operating_hours)
        VALUES ('General Services', 'Handles general city services', ARRAY['Other'], 'generalservices@city.gov', '+1234567893', '321 Service Blvd', '{"weekdays": "9:00 AM - 5:00 PM", "weekends": "Closed"}');
    END IF;
END $$;
