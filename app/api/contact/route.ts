import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required. " }, { status: 400 });
    }

    // 2. Email Logic
    const data = await resend.emails.send({
      from: "Resume.ai <onboarding@resend.dev>",
      to: ["kunal.codes24@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Inquiry</h2>
          <p style="margin-top: 20px;"><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Message Details:</p>
            <p style="color: #444; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            This email was sent from your Resume.ai contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
