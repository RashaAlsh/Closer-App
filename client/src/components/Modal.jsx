import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import { GrClose } from "react-icons/gr";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="x-icon" onClick={onClose}>
          <GrClose />
        </span>
        <h1>Terms and Conditions</h1>
        <div>
          <p>
            Welcome to Gezeligness! These Terms and Conditions
            (&quot;Terms&quot;) govern your use of our mobile application and
            services (&quot;Services&quot;). By downloading, accessing, or using
            Gezeligness, you agree to be bound by these Terms. If you do not
            agree to these Terms, please do not use our app.
          </p>

          <p>1. Acceptance of Terms</p>
          <p>
            By creating an account or using our Services, you acknowledge that
            you have read, understood, and agree to be bound by these Terms, as
            well as our Privacy Policy.
          </p>

          <p>2. Eligibility</p>
          <p>
            To use Gezeligness, you must be at least 18 years old or have
            parental consent if you are between 13 and 17 years old. By using
            the app, you represent and warrant that you meet these requirements.
          </p>

          <p>3. User Account</p>
          <p>
            Registration: To access certain features, you must create an account
            by providing accurate and complete information. You are responsible
            for maintaining the confidentiality of your account information.
          </p>
          <p>
            Account Security: You agree to notify us immediately of any
            unauthorized use of your account. We are not responsible for any
            losses or damages arising from unauthorized use.
          </p>

          <p>4. User Conduct</p>
          <p>
            You agree to use Gezeligness only for lawful purposes and in a
            manner that does not infringe the rights of, or restrict or inhibit
            the use and enjoyment of the app by any third party. Prohibited
            conduct includes but is not limited to:
          </p>
          <ul>
            <li>
              Posting or transmitting offensive, harmful, or inappropriate
              content.
            </li>
            <li>
              Harassing, threatening, or discriminating against other users.
            </li>
            <li>Impersonating any person or entity.</li>
          </ul>

          <p>5. Content</p>
          <p>
            User-Generated Content: You are solely responsible for the content
            you post or transmit via the app. By posting content, you grant
            Gezeligness a non-exclusive, royalty-free, perpetual, and worldwide
            license to use, reproduce, modify, publish, and distribute such
            content.
          </p>
          <p>
            Proprietary Rights: All content and materials available on
            Gezeligness are protected by intellectual property laws. You agree
            not to reproduce, distribute, or create derivative works from any
            content without prior written consent from us.
          </p>

          <p>6. Meetups and Events</p>
          <p>
            Organizers: Users can organize events through the app. Organizers
            are solely responsible for the event&apos;s planning, safety, and
            execution. Gezeligness is not responsible for any issues that may
            arise during events.
          </p>
          <p>
            Participants: Participation in any event organized through the app
            is at your own risk. You agree to comply with any terms and
            conditions set forth by the event organizers.
          </p>

          <p>7. Payments and Fees</p>
          <p>
            All purchases made through Gezeligness are non-refundable. By making
            a payment, you acknowledge that you will not be entitled to any
            refunds.
          </p>

          <p>8. Termination</p>
          <p>
            We reserve the right to suspend or terminate your account or access
            to our Services at our sole discretion, without notice, for conduct
            that violates these Terms or is otherwise harmful to other users or
            third parties.
          </p>

          <p>9. Limitation of Liability</p>
          <p>
            Gezeligness is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee the accuracy, completeness, or reliability
            of any content. We are not liable for any direct, indirect,
            incidental, or consequential damages arising from your use of the
            app.
          </p>

          <p>10. Indemnification</p>
          <p>
            You agree to indemnify and hold harmless Gezeligness and its
            affiliates from any claims, damages, losses, or expenses arising out
            of your use of the app or violation of these Terms.
          </p>

          <p>11. Changes to Terms</p>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Your continued use of the app
            after changes are posted constitutes your acceptance of the new
            Terms.
          </p>

          <p>12. Governing Law</p>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the Netherlands. Any disputes arising from these Terms shall
            be resolved in the courts of the Netherlands.
          </p>

          <p>13. Location Data</p>
          <p>
            By using Gezeligness, you agree to allow the app to access your
            device&apos;s location data. This information is used to provide
            location-based services, such as showing your current location on
            the map and displaying nearby users and events. We do not share your
            location data with third parties without your consent.
          </p>
          <p>
            You can disable location services at any time through your device
            settings, but this may limit the functionality of the app.
          </p>
        </div>
        <button className="modal-button-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
