import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-4">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  Welcome to GitVigil. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <p>
                  We collect your GitHub Personal Access Token to maintain your GitHub streak. This token is encrypted using AES-256-CBC encryption before being stored.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p>
                  Your encrypted GitHub token is used solely for the purpose of maintaining your GitHub streak. We do not use this information for any other purpose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
                <p>
                  We implement robust security measures to protect your data:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Your GitHub token is encrypted using AES-256-CBC encryption.</li>
                  <li>We use a unique encryption key and initialization vector for each user.</li>
                  <li>Encryption keys are stored securely and separately from the encrypted data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
                <p>
                  We retain your encrypted GitHub token only for as long as necessary to provide you with the GitVigil service. You can request deletion of your data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request that we correct any inaccurate personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Withdraw your consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@gitvigil.com.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}