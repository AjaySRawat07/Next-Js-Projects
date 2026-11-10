import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        console.log(`[AUTH] Generating verification code ${verifyCode} for user @${username} (${email})`);

        // On Resend free tier (onboarding@resend.dev), emails can only be sent to your registered account
        const targetEmail = "ajaysinghrwt23@gmail.com";

        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [targetEmail],
            subject: "Mystery message | Verification code",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
                    <h1 style="color: #111; font-size: 22px; margin-bottom: 8px;">Your OTP is ${verifyCode}</h1>
                    <p style="color: #444; font-size: 14px; margin: 0 0 12px 0;">Hello <strong>@${username}</strong>,</p>
                    <p style="color: #444; font-size: 14px; line-height: 1.5;">
                        Thank you for registering on <strong>TrueFeedback</strong>. Please use the verification code below to verify your account (registered with ${email}):
                    </p>
                    <div style="background-color: #f4f4f5; padding: 14px 20px; border-radius: 6px; display: inline-block; margin: 16px 0;">
                        <span style="font-size: 26px; font-weight: bold; letter-spacing: 4px; color: #111;">${verifyCode}</span>
                    </div>
                    <p style="color: #888; font-size: 12px; margin-top: 16px;">
                        If you did not request this code, please ignore this email.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API returned error:", error);
            return {
                success: false,
                message: error.message || "Failed to send verification email",
            };
        }

        console.log(`[AUTH] Verification email successfully delivered to ${targetEmail} (Message ID: ${data?.id})`);

        return {
            success: true,
            message: "Verification email sent successfully",
        };
    } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}