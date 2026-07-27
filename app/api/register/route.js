import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, businessName, email, phone } = body;

    const adminEmail =
      process.env.ADMIN_EMAIL ||
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      "hevardhan2004@gmail.com";

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      "575b3a59-be72-4f05-898a-fd202acc9c60";

    console.log("=== B2B AGENT REGISTRATION SUBMITTED ===");
    console.log("To Admin Email:", adminEmail);
    console.log("Using Web3Forms Access Key:", accessKey);
    console.log("Form Results:", {
      firstName,
      lastName,
      businessName,
      email,
      phone,
    });

    let emailSent = false;

    // 1. Primary Method: Send via Web3Forms API
    try {
      console.log("Sending email notification via Web3Forms...");
      const web3FormsRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New B2B Agent Sign-Up: ${businessName} (${firstName} ${lastName})`,
          from_name: "U2 Travels B2B Portal",
          replyto: email,
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          business_name: businessName,
          message: `New B2B Agent Registration Received!\n\nName: ${firstName} ${lastName}\nBusiness Name: ${businessName}\nEmail: ${email}\nPhone: ${phone}\n\nPlease review and approve this agency in the U2 Travels dashboard. The applicant has been prompted to download the wholesale cost sheet.`,
        }),
      });

      const web3FormsData = await web3FormsRes.json();
      if (web3FormsRes.ok && web3FormsData.success) {
        emailSent = true;
        console.log(
          `✅ Sent sign-up notification via Web3Forms successfully to ${adminEmail}!`,
        );
      } else {
        console.error("⚠️ Web3Forms error:", web3FormsData);
      }
    } catch (web3Err) {
      console.error("Error communicating with Web3Forms API:", web3Err);
    }

    // 2. Secondary Optional Method: If SMTP_PASS is configured in .env, also send via Nodemailer
    try {
      const smtpPass = process.env.SMTP_PASS;
      if (smtpPass) {
        const nodemailer = await import("nodemailer");
        const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
        const smtpPort = process.env.SMTP_PORT || 465;
        const smtpUser = process.env.SMTP_USER || adminEmail;

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        // Send confirmation email to applicant & admin
        await transporter.sendMail({
          from: `"U2 Travels B2B Team" <${smtpUser}>`,
          to: `${email}, ${adminEmail}`,
          subject: `Registration Received - U2 Travels & Tours Wholesale Access`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #013b85; margin-bottom: 15px;">Registration Successful!</h2>
              <p style="color: #333; line-height: 1.6;">Hi ${firstName},</p>
              <p style="color: #333; line-height: 1.6;">
                Thank you for signing up with <strong>U2 Travels & Tours</strong> as a B2B partner (${businessName}). 
                We have received your application and sent a notification to our team at <strong>${adminEmail}</strong>.
              </p>
              <p style="color: #333; line-height: 1.6;">
                We will review your credentials and get back to you shortly with your approved wholesale login details.
              </p>
              <div style="margin: 25px 0; text-align: center;">
                <a href="https://drive.google.com/file/d/1Vt3g74NVbqD-KEwpP-lkFTOgqkYHO5FI/view?usp=sharing" target="_blank" style="background-color: #013b85; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Download 2026 Wholesale Cost Sheet
                </a>
              </div>
              <p style="color: #666; font-size: 13px; margin-top: 30px;">
                Best regards,<br/>
                <strong>U2 Travels & Tours B2B Partnership Team</strong><br/>
                Email: ${adminEmail}
              </p>
            </div>
          `,
        });
        console.log("✅ Sent secondary SMTP confirmation email!");
      }
    } catch (mailError) {
      console.error("Optional SMTP error:", mailError.message);
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: "Registration successful! We will get back to you.",
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process registration" },
      { status: 500 },
    );
  }
}
