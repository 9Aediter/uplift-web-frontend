import { NextRequest, NextResponse } from 'next/server';

interface ConsultationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interestedSystem: string;
  projectDescription: string;
  requirements?: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'interestedSystem', 'projectDescription', 'preferredDate', 'preferredTime'];
    for (const field of requiredFields) {
      if (!body[field as keyof ConsultationRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate date format and ensure it's not in the past
    const consultationDate = new Date(body.preferredDate + 'T' + body.preferredTime);
    if (consultationDate < new Date()) {
      return NextResponse.json(
        { error: 'Consultation date cannot be in the past' },
        { status: 400 }
      );
    }

    // Log consultation request for now (in production, you'd save to database and send emails)
    console.log('New consultation request:', {
      ...body,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, implement:
    // 1. Save consultation request to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to client
    // 4. Create calendar event
    // 5. Set up reminder notifications

    // For now, just return success
    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received successfully',
        data: {
          consultationId: `consult_${Date.now()}`,
          scheduledFor: consultationDate.toISOString(),
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing consultation request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}