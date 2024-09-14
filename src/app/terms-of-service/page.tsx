import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-4">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>
                  By using GitVigil, you agree to be bound by these Terms of Service. If you don&#39;t agree to these terms, please do not use the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
                <p>
                  GitVigil is a service designed to help users maintain their GitHub contribution streak. It requires access to your GitHub account via a Personal Access Token.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. Your Responsibilities</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your GitHub Personal Access Token. You agree not to share your token or your GitVigil account with others.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Data Privacy and Security</h2>
                <p>
                  We take the security of your data seriously. Your GitHub token is encrypted using AES-256-CBC encryption before being stored. For more details, please refer to our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
                <p>
                  GitVigil is provided as is without any guarantees or warranties. We are not responsible for any damages or losses related to your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Changes to the Service</h2>
                <p>
                  We reserve the right to modify or discontinue GitVigil at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                <p>
                  We may terminate or suspend your access to GitVigil immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
                <p>
                  We reserve the right to update or change our Terms of Service at any time. We will provide notice of any significant changes. Your continued use of GitVigil after we post any modifications to the Terms of Service will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at terms@gitvigil.com.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}