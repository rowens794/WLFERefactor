import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class PrivacyPolicy extends Component {
    render() {
        return (
            <div className={css(styles.body)}>
                <p><strong>Flipping The Scales Privacy Policy</strong></p>
                <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit www.flippingthescales.com (the &ldquo;Site&rdquo;).&nbsp;</p>
                <p><strong>PERSONAL INFORMATION WE COLLECT</strong></p>
                <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as &ldquo;Device Information.&rdquo;</p>
                <p>In addition to Device Information we also collect certain User Information for the proper functioning of the application.&nbsp; User Information includes email addresses and user weight logging.&nbsp; This information is used within the application to keep track of your weight change during competitions with other users.</p>
                <p>We collect Device Information using the following technologies:</p>
                <p>&nbsp;&nbsp;&nbsp; - &ldquo;Cookies&rdquo; are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
                <p>&nbsp;&nbsp;&nbsp; - &ldquo;Local Storage&rdquo; are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
                <p>&nbsp;&nbsp;&nbsp; - &ldquo;Log files&rdquo; track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
                <p>&nbsp; &nbsp;&nbsp;- &ldquo;Web beacons,&rdquo; &ldquo;tags,&rdquo; and &ldquo;pixels&rdquo; are electronic files used to record information about how you browse the Site.</p>
                <p>When we talk about &ldquo;Personal Information&rdquo; in this Privacy Policy, we are talking both about Device Information and User Information.</p>
                <p><strong>HOW DO WE USE YOUR PERSONAL INFORMATION?</strong></p>
                <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our users browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
                <p>We use the Device Information that we collect to provide you with feedback on the competitions that you participate in.&nbsp; This feedback may occur through our Site or through the emails that we send to you.&nbsp;</p>
                <p>We may use Device Information to provide you with offers from partners that we have affiliate relationships with.</p>
                <p><strong>SHARING YOUR PERSONAL INFORMATION</strong></p>
                <p>We may share your Personal Information with third parties to help us use your Personal Information, as described above. &nbsp;We also use Google Analytics to help us understand how our users use the Site--you can read more about how Google uses your Personal Information here:&nbsp; https://www.google.com/intl/en/policies/privacy/.&nbsp; You can also opt-out of Google Analytics here:&nbsp; https://tools.google.com/dlpage/gaoptout.&nbsp;</p>
                <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
                <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.&nbsp; For more information about how targeted advertising works, you can visit the Network Advertising Initiative&rsquo;s (&ldquo;NAI&rdquo;) educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.</p>
                <p>You can opt out of targeted advertising by:</p>
                <p>FACEBOOK - https://www.facebook.com/settings/?tab=ads</p>
                <p>GOOGLE - https://www.google.com/settings/ads/anonymous&nbsp;</p>
                <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance&rsquo;s opt-out portal at:&nbsp; http://optout.aboutads.info/.</p>
                <p>Please note that we do not alter our Site&rsquo;s data collection and use practices when we see a Do Not Track signal from your browser.</p>
                <p><strong>CHANGES</strong></p>
                <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
                <p><strong>CONTACT US</strong></p>
                <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at admin@flippingthescales.com or by mail using the details provided below:</p>
                <p>&nbsp; PO Box 4725, Charleston, WV, 25364, United States</p>
            </div>
        );
    }
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    body: {
        margin: '5vh',
        textAlign: 'left',
    },
});