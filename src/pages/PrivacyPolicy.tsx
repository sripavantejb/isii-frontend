import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: '#f2f5f7' }}>
        <div className="container-custom section-padding">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Client Privacy Policy
          </h1>
          <p className="font-serif text-base text-foreground animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Last updated: January 15, 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-16 pb-24 bg-background">
        <div className="container-custom section-padding">
            {/* Introduction */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                Institute for Strategic Intelligence and Intervention ("ISII", "we" or "us" "our") respects your privacy and is committed to protecting your personal data (Your Data). This notice, last updated on January 15, 2026, is to help you understand what data we collect, why we collect it and what we do with Your Data when you instruct us to provide our services to you.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                It is important that you read this notice together with any other privacy policy we may provide on specific occasions when we are collecting or processing Your Data so that you are fully aware of how and why we are using Your Data. This notice supplements the other notices or policies and is not intended to override them.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                This notice is not intended for children. We do not collect data relating to children except where it is provided by you in the nature of an instruction with us.
              </p>
            </div>

            {/* Important Information */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Important information about who we are
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                ISII is a controller for the purposes of processing Your Data under your retainer with us and is responsible for all personal data received and held by ISII. We have appointed a Privacy Officer who is responsible for overseeing questions in relation to this notice. If you have any questions about this notice, including any requests to exercise your legal rights, please contact the Privacy Officer using the details set out below.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                During the provision of our services to you we will retain Your Data to perform the contract. We are required by law to retain specific categories of Your Data for certain periods after you cancel your contract with us and comply at all times with anti-money laundering regulations. Please see our current Data Retention Policy in our Website Privacy Policy. Please note that our Data Retention Policy may be amended from time to time.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                We will take all reasonable steps to destroy or erase Your Data that we no longer require in accordance with our applicable Data Retention Policy. This includes requiring third parties to delete such data where applicable.
              </p>
            </div>

            {/* Controller */}
            <div className="mb-12 animate-fade-in bg-muted p-6 rounded-lg" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Controller
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                The Company is the controller and responsible for Your Data. We have appointed a privacy officer (Privacy Officer) who is responsible for overseeing questions in relation to this policy. If you have any questions about this policy, including any requests to exercise Your legal rights, please contact the Privacy Officer using the details set out below:
              </p>
              <div className="space-y-2 mt-6">
                <p className="font-serif text-base text-foreground">
                  <strong>Full name of legal entity:</strong><br />
                  Greater Pacific Capital LLP
                </p>
                <p className="font-serif text-base text-foreground">
                  <strong>Name or title of Privacy Officer:</strong><br />
                  Lesley Whittle
                </p>
                <p className="font-serif text-base text-foreground">
                  <strong>Email address:</strong><br />
                  <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">
                    lesley.whittle@forcegood.org
                  </a>
                </p>
                <p className="font-serif text-base text-foreground">
                  <strong>Postal address:</strong><br />
                  38 Wigmore Street, London, W1U 2RU
                </p>
                <p className="font-serif text-base text-foreground">
                  <strong>Telephone number:</strong><br />
                  +44 207 535 1690
                </p>
              </div>
              <p className="font-serif text-base text-foreground leading-relaxed mt-6">
                If you have any queries, concerns or complaints about the use of Your Data by us, please raise them with the Privacy Officer. If this does not resolve the problem to your satisfaction, or, if you prefer to raise the issue with somebody else, then please speak to our client care officer, Gary Varley (Compliance Officer), who will deal with your complaint. You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues (<a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">www.ico.org.uk</a>). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.
              </p>
            </div>

            {/* Changes to the notice */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Changes to the notice and your duty to inform us of the changes
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                This version was last updated on January 15, 2026.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                It is important that the personal data we hold about you is accurate and current. Please keep us informed if Your Data changes during your relationship with us.
              </p>
            </div>

            {/* The Data We Collect */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                The Data We Collect About You
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                Personal data or personal information means any information about an individual from which that person can be identified which includes not only individuals in their personal or private capacity but also directors and owners of bodies corporate. It does not include data where a person's identity has been removed (anonymous data). We may collect, use, store and transfer different kinds of data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 font-serif text-base text-foreground">
                <li><strong>Identity Details</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
                <li><strong>Contact Details</strong> includes billing address, home address, email address and telephone numbers.</li>
                <li><strong>Financial Details</strong> includes bank account and payment card details.</li>
                <li><strong>Matter Details</strong> includes any information you provide to us for the Performance of the Contract. For example, the investigation brief, results and related information or any other information concerning circumstance for the Performance of the Contract.</li>
                <li><strong>Transaction Details</strong> includes details about payments to and from you and other details of services you have purchased from us.</li>
                <li><strong>Marketing and Communications Details</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We also collect and use Aggregated Data such as statistical or demographic data for internal purposes. Aggregated Data may be derived from Your Data but is not considered personal data in law as this data does not directly or indirectly reveal your identity. However, if we combine or connect Aggregated Data with Your Data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this notice.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                We may be required to collect Special Categories of Your Data (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data for example; finger prints) including information about criminal convictions and offences for the provision of our services. This will be in the Performance of a Contract. Unless we are required to collect Special Categories of Your Data for the Performance of a Contract, we will not collect this data without your express consent.
              </p>
            </div>

            {/* If you fail to provide data */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                If you or any third party fails to provide required data
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed">
                Where we need to collect Your Data (or any other person's data) by reason of our legal obligations or for the Performance of a Contract and that data is not provided when requested, we may not be able to provide our services under our Contract. In this case, we may have to cancel the Contract, but we will notify you if this is the case at the time.
              </p>
            </div>

            {/* How we use your data */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                How we use your data
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We will only use Your Data when the law allows us to and in accordance with our obligations to our clients. Most commonly, we will use Your Data in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 font-serif text-base text-foreground">
                <li>In anticipation of and in connection with the Performance of the Contract.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                See "Purposes for which we will use your data" to find out more about the types of lawful basis that we will rely on to process your personal data.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                Generally, we do not rely on consent as a legal basis for processing Your Data other than in relation to sending direct marketing communications to you most commonly via email. You have the right to withdraw consent to marketing at any time by using the unsubscribe button in any email communication or emailing the Privacy Officer at <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a>.
              </p>
            </div>

            {/* Purposes table */}
            <div className="mb-12 animate-fade-in overflow-x-auto" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Purposes for which we will use your data
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We set out, in the below table, a description of all the ways we plan to use Your Data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-6">
                Note that we may process Your Data for more than one lawful ground depending on the specific purpose for which we are using Your Data. Please email <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a> if you need details about the specific legal ground we are relying on to process Your Data where more than one ground has been set out in the table below.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-4 text-left font-serif font-bold text-primary">Purpose/Activity</th>
                      <th className="border border-border p-4 text-left font-serif font-bold text-primary">Type of data</th>
                      <th className="border border-border p-4 text-left font-serif font-bold text-primary">Lawful basis for processing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-4 font-serif text-base text-foreground">To register you as a new client and provide services to you in relation to our investment fund services and any other matters</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact<br />(c) Financial<br />(d) Matter</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">Performance of a contract with you</td>
                    </tr>
                    <tr className="bg-muted">
                      <td className="border border-border p-4 font-serif text-base text-foreground">To recruit you and/or employ you</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact<br />(c) Recruitment</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">Performance of a contract with you</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-serif text-base text-foreground">To manage our relationship with you which will include:<br />(a) Notifying you about changes to our terms or privacy policy<br />(b) Asking you to leave a review or take a survey</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact<br />(c) Matter<br />(d) Marketing and Communications</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Performance of a contract with you<br />(b) Necessary to comply with a legal obligation<br />(c) Consent (for the purposes of Marketing and Communications)</td>
                    </tr>
                    <tr className="bg-muted">
                      <td className="border border-border p-4 font-serif text-base text-foreground">To administer and protect our business (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Performance of a contract with you<br />(b) Necessary to comply with a legal obligation</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-4 font-serif text-base text-foreground">To deliver relevant website content and updates to you and measure or understand the effectiveness of the advertising we serve to you</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact<br />(c) Marketing and Communications</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">Consent</td>
                    </tr>
                    <tr className="bg-muted">
                      <td className="border border-border p-4 font-serif text-base text-foreground">To make suggestions and recommendations to you about goods or services that may be of interest to you</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">(a) Identity<br />(b) Contact<br />(c) Matter</td>
                      <td className="border border-border p-4 font-serif text-base text-foreground">Consent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Marketing */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Marketing
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. We have established the following personal data control mechanisms:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Promotional offers from us</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    We may use your Identity and Contact Data to form a view on what we think you may want or need, or what may be of interest to you. This is how we decide which products, services and offers may be relevant for you (we call this marketing). We will only do so with your Consent.
                  </p>
                  <p className="font-serif text-base text-foreground leading-relaxed mt-2">
                    You will receive marketing communications from us if you have given your Consent for us to use Your Data in this way. You have the right of Opting-Out at any time as described below.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Third party marketing</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    We will get your express opt-in consent before we share Your Data with any company outside ISII for marketing purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Opting out</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    You can ask us or third parties to stop sending you marketing messages at any time by emailing <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a> or by clicking on an email unsubscribe link.
                  </p>
                  <p className="font-serif text-base text-foreground leading-relaxed mt-2">
                    Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a service purchase, warranty registration, product/service experience or other transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Cookies
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed">
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible or not function properly.
              </p>
            </div>

            {/* Change of Purpose */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Change of Purpose
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We will only use Your Data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please email <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a>.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                If we need to use Your Data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mt-4">
                Please note that we may process Your Data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law.
              </p>
            </div>

            {/* Disclosure */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Disclosure of Your Data
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We may have to share Your Data with the parties set out below for the purposes set out in "Purposes for which we will use your data" above.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 font-serif text-base text-foreground">
                <li>Information sent using the contact entry forms on the team and contact page of our website are received by partners and staff of ISII and a partner of our affiliated office in Dubai.</li>
                <li>Internal Third Parties as set out in the Glossary.</li>
                <li>External Third Parties as set out in the Glossary.</li>
                <li>Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use Your Data in the same way as set out in this notice.</li>
              </ul>
              <p className="font-serif text-base text-foreground leading-relaxed">
                We require all third parties to respect the security of Your Data and to treat it in accordance with the law. We do not allow our third-party service providers to use Your Data for their own purposes and only permit them to process Your Data for specified purposes and in accordance with our instructions.
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                International Transfers
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We may share Your Data with the Group where necessary in relation to the Performance of the Contract. This will involve transferring Your Data outside the EEA.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                Some of our external third parties are based outside the EEA so their processing of Your Data will involve a transfer of data outside the EEA.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                Whenever we transfer Your Data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 font-serif text-base text-foreground">
                <li>We will only transfer Your Data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission.</li>
                <li>Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.</li>
                <li>Where we use providers based in the US, we may transfer data to them if they are part of the EU-US Privacy Shield Framework which requires them to provide similar protection to personal data shared between the Europe and the US.</li>
              </ul>
              <p className="font-serif text-base text-foreground leading-relaxed">
                Please email <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a> if you would like further information on the specific mechanism used by us when transferring Your Data out of the EEA.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Data Security
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We have put in place appropriate security measures to prevent Your Data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to Your Data to those employees, agents, contractors and other third parties who have a business need to know. They will only process Your Data on our instructions and they are subject to a duty of confidentiality.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Data Retention
              </h2>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">
                How long will you use my personal data for?
              </h3>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                We will only retain Your Data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                To determine the appropriate retention period for Your Data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of Your Data, the purposes for which we process Your Data and whether we can achieve those purposes through other means, and the applicable legal requirements.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                During the provision of our services to you we will retain Your Data to perform the contract. We are required by law to retain specific categories of Your Data for certain periods after you cancel your contract with us and comply at all times with anti-money laundering regulations. Please see our current Data Retention Policy in our Website Privacy Policy. Please note that our Data Retention Policy may be amended from time to time.
              </p>
              <p className="font-serif text-base text-foreground leading-relaxed">
                We will take all reasonable steps to destroy or erase Your Data that we no longer require in accordance with our applicable Data Retention Policy. This includes requiring third parties to delete such data where applicable.
              </p>
            </div>

            {/* Your Legal Rights */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Your Legal Rights
              </h2>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                In certain circumstances, you have the following rights under data protection laws in relation to Your Data. You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-3 mb-4 font-serif text-base text-foreground">
                <li><strong>Request access</strong> to Your Data (commonly known as a "data subject access request"). This enables you to receive a copy of the Your Data we hold about you and to check that we are lawfully processing it.</li>
                <li><strong>Request correction</strong> of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.</li>
                <li><strong>Request erasure</strong> of Your Data. This enables you to ask us to delete or remove Your Data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove Your Data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase Your Data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.</li>
                <li><strong>Object to processing</strong> of Your Data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing Your Data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.</li>
                <li><strong>Request restriction of processing</strong> of Your Data. This enables you to ask us to suspend the processing of Your Data in the following scenarios:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>if you want us to establish the data's accuracy;</li>
                    <li>where our use of the data is unlawful but you do not want us to erase it;</li>
                    <li>where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims; or</li>
                    <li>you have objected to our use of Your Data but we need to verify whether we have overriding legitimate grounds to use it.</li>
                  </ul>
                </li>
                <li><strong>Request the transfer</strong> of Your Data to you or to a third party. We will provide to you, or a third party you have chosen, Your Data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.</li>
                <li><strong>Withdraw consent</strong> at any time where we are relying on consent to process Your Data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.</li>
              </ul>
              <p className="font-serif text-base text-foreground leading-relaxed mb-4">
                If you wish to exercise any of the rights set out above, please email <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a>.
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">No Fee Usually Required</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    You will not have to pay a fee to access Your Data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we may refuse to comply with your request in these circumstances.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">What we may need from you</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    We may need to request specific information from you to help us confirm your identity and ensure your right to access Your Data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Time Limit to Respond</h3>
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    We try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.
                  </p>
                </div>
              </div>
            </div>

            {/* Glossary */}
            <div className="mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                Glossary
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Lawful bases:</h3>
                  <ul className="space-y-3 font-serif text-base text-foreground">
                    <li>
                      <strong>Legitimate Interest</strong> means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process Your Data for our legitimate interests. We do not use Your Data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by emailing <a href="mailto:lesley.whittle@forcegood.org" className="text-primary underline hover:text-primary/80">lesley.whittle@forcegood.org</a>.
                    </li>
                    <li>
                      <strong>Performance of the Contract</strong> means processing Your Data where in connection with our obligations under our contract of retainer to which you are a party or to take steps at your request before entering into such a contract.
                    </li>
                    <li>
                      <strong>Comply with a legal or regulatory obligation</strong> means processing Your Data where it is necessary for compliance with a legal or regulatory obligation that we are subject to.
                    </li>
                    <li>
                      <strong>Consent</strong> means processing Your Data where you have given us clear consent to do so for a specific purpose.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Third parties:</h3>
                  <ul className="space-y-2 font-serif text-base text-foreground">
                    <li>
                      <strong>Internal Third Parties</strong> means offices of ISII acting as joint controllers or processors and who are based in countries such as India.
                    </li>
                    <li>
                      <strong>External Third Parties</strong> means service providers acting as processors based in the UK who provide IT and system administration or other services.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;

