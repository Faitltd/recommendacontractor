<script lang="ts">
  // FAQ data organized by categories
  let faqCategories = $state([
    {
      id: 'general',
      name: 'General Questions',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      questions: [
        {
          id: 'what-is-platform',
          question: 'What is Recommend a Contractor?',
          answer: 'Recommend a Contractor is Denver\'s most trusted platform for connecting homeowners with verified, highly-rated contractors. We help you find reliable professionals for all your home improvement needs, from plumbing and electrical work to roofing and remodeling.'
        },
        {
          id: 'how-it-works',
          question: 'How does the platform work?',
          answer: 'It\'s simple! Search for contractors by service type or location, read verified reviews from real customers, compare ratings and qualifications, then contact contractors directly through our platform. All contractors are thoroughly vetted and verified before joining our network.'
        },
        {
          id: 'cost-to-use',
          question: 'Is it free to use?',
          answer: 'Yes! Homeowners can search, browse contractor profiles, read reviews, and contact contractors completely free. There are no hidden fees or charges for using our platform.'
        },
        {
          id: 'service-areas',
          question: 'What areas do you serve?',
          answer: 'We currently serve the Denver metropolitan area, including Denver, Aurora, Lakewood, Thornton, Westminster, Arvada, and surrounding communities. We\'re continuously expanding to serve more areas in Colorado.'
        },
        {
          id: 'platform-history',
          question: 'How long has the platform been operating?',
          answer: 'Recommend a Contractor was founded in 2020 and has been serving the Denver area for over 4 years. We\'ve facilitated thousands of successful contractor-homeowner connections and continue to grow our network of verified professionals.'
        },
        {
          id: 'quality-standards',
          question: 'What quality standards do you maintain?',
          answer: 'We maintain strict quality standards including mandatory licensing verification, insurance requirements, background checks, customer review monitoring, and ongoing performance evaluation. Contractors who don\'t meet our standards are removed from the platform.'
        },
        {
          id: 'platform-updates',
          question: 'How often do you update the platform?',
          answer: 'We continuously improve our platform with regular updates including new features, enhanced search capabilities, improved mobile experience, and additional contractor categories. Major updates are released quarterly, with minor improvements deployed weekly.'
        }
      ]
    },
    {
      id: 'homeowners',
      name: 'For Homeowners',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      questions: [
        {
          id: 'find-contractors',
          question: 'How do I find contractors in my area?',
          answer: 'Use our search feature to find contractors by service type (plumbing, electrical, HVAC, etc.) or enter your ZIP code to see contractors serving your area. You can filter results by ratings, years of experience, and verification status.'
        },
        {
          id: 'verify-contractors',
          question: 'How do I know if a contractor is legitimate?',
          answer: 'All contractors on our platform are verified. Look for the "Verified" badge, which means we\'ve checked their business license, insurance, and background. You can also read reviews from verified customers and check their ratings.'
        },
        {
          id: 'contact-contractors',
          question: 'How do I contact a contractor?',
          answer: 'Click on any contractor\'s profile to view their contact information. You can call them directly or send an email. When you contact a contractor through our platform, they\'ll know you found them through Recommend a Contractor.'
        },
        {
          id: 'get-quotes',
          question: 'Can I get quotes through the platform?',
          answer: 'While we don\'t provide quotes directly, you can contact multiple contractors to request estimates for your project. We recommend getting at least 3 quotes to compare pricing and services.'
        },
        {
          id: 'emergency-services',
          question: 'Can I find emergency contractors?',
          answer: 'Yes! Many contractors on our platform offer emergency services. Look for contractors who mention 24/7 availability or emergency services in their profiles. You can also filter search results to show only contractors who offer emergency services.'
        },
        {
          id: 'project-timeline',
          question: 'How long do projects typically take?',
          answer: 'Project timelines vary greatly depending on the type and scope of work. Small repairs might take a few hours, while major renovations can take weeks or months. Each contractor will provide estimated timelines when you request quotes.'
        },
        {
          id: 'write-reviews',
          question: 'How do I write a review?',
          answer: 'After working with a contractor, you can write a review by visiting their profile page and clicking "Write a Review." You\'ll rate different aspects of their service and share your experience to help other homeowners.'
        },
        {
          id: 'contractor-availability',
          question: 'How do I know if a contractor is available?',
          answer: 'Contractor profiles show their general availability and response time. For specific project timing, contact contractors directly. Many update their availability status regularly, and premium contractors often respond within hours.'
        },
        {
          id: 'multiple-quotes',
          question: 'Should I get multiple quotes?',
          answer: 'Yes! We strongly recommend getting 3-5 quotes for any significant project. This helps you understand market pricing, compare approaches, and find the best fit for your needs. Our platform makes it easy to contact multiple contractors quickly.'
        },
        {
          id: 'contractor-specialties',
          question: 'How do I find contractors with specific specialties?',
          answer: 'Use our advanced search filters to find contractors by specialty (e.g., "kitchen remodeling," "emergency plumbing," "solar installation"). You can also search by certifications, years of experience, and customer ratings.'
        },
        {
          id: 'project-budgeting',
          question: 'How do I budget for my project?',
          answer: 'Research typical costs for your project type, get multiple detailed quotes, add 10-20% contingency for unexpected issues, consider material vs. labor costs, and factor in permits and inspections. Our contractor profiles often include typical project ranges.'
        },
        {
          id: 'permit-requirements',
          question: 'Who handles permits for my project?',
          answer: 'This varies by project and contractor. Many contractors handle permit applications as part of their service, while others expect homeowners to obtain permits. Always clarify permit responsibilities before starting work and ensure all required permits are obtained.'
        }
      ]
    },
    {
      id: 'contractors',
      name: 'For Contractors',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      questions: [
        {
          id: 'join-platform',
          question: 'How do I join as a contractor?',
          answer: 'Click "Join as a Contractor" and complete our registration process. You\'ll need to provide business information, license details, insurance documentation, and service areas. Our team will review and verify your application within 2-3 business days.'
        },
        {
          id: 'verification-process',
          question: 'What is the verification process?',
          answer: 'We verify your business license, insurance coverage, and conduct background checks. You may need to provide additional documentation such as references or certifications. This process ensures only qualified, legitimate contractors join our platform.'
        },
        {
          id: 'cost-for-contractors',
          question: 'How much does it cost to join?',
          answer: 'Basic listing is free! You can create a profile, receive customer contacts, and build your reputation at no cost. We also offer premium features like featured listings and enhanced profiles for contractors who want additional visibility.'
        },
        {
          id: 'get-leads',
          question: 'How do I get leads?',
          answer: 'Once verified, your profile will be visible to homeowners searching for your services. Maintain high ratings, respond promptly to inquiries, and keep your profile updated to attract more customers.'
        },
        {
          id: 'manage-reviews',
          question: 'Can I respond to reviews?',
          answer: 'Yes! You can respond to reviews on your profile. This shows potential customers that you care about feedback and are committed to customer satisfaction. Professional responses to both positive and negative reviews can enhance your reputation.'
        },
        {
          id: 'profile-photos',
          question: 'What photos should I include in my profile?',
          answer: 'Include high-quality photos of completed projects, your team at work, equipment and tools, before/after transformations, and professional headshots. Avoid blurry images, and ensure photos showcase your best work. Premium accounts can upload unlimited photos.'
        },
        {
          id: 'service-area-expansion',
          question: 'Can I expand my service area?',
          answer: 'Yes! You can update your service areas anytime from your profile dashboard. Consider travel time, logistics, and local licensing requirements when expanding. Larger service areas can increase lead opportunities but may affect response times.'
        },
        {
          id: 'seasonal-business',
          question: 'How do I handle seasonal fluctuations?',
          answer: 'Update your profile to reflect seasonal services (e.g., snow removal in winter, landscaping in spring), adjust availability status during slow periods, consider offering complementary services, and use downtime for training and equipment maintenance.'
        },
        {
          id: 'customer-communication',
          question: 'What are best practices for customer communication?',
          answer: 'Respond to inquiries within 24 hours (preferably within 2-4 hours), be clear about pricing and timelines, provide detailed written estimates, maintain professional communication, follow up after project completion, and ask satisfied customers for reviews.'
        },
        {
          id: 'dispute-prevention',
          question: 'How can I prevent disputes with customers?',
          answer: 'Use detailed written contracts, communicate expectations clearly, provide regular project updates, document changes in writing, address concerns immediately, maintain professional standards, and ensure customer satisfaction before requesting final payment.'
        }
      ]
    },
    {
      id: 'reviews',
      name: 'Reviews & Ratings',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      questions: [
        {
          id: 'verified-reviews',
          question: 'Are all reviews verified?',
          answer: 'Yes! All reviews come from verified customers who have actually worked with the contractor. We have systems in place to detect and prevent fake reviews, ensuring you can trust the feedback you read.'
        },
        {
          id: 'review-categories',
          question: 'What do the different rating categories mean?',
          answer: 'We rate contractors on multiple aspects: Quality (workmanship), Timeliness (meeting deadlines), Communication (responsiveness and clarity), Pricing (value for money), and Cleanliness (job site maintenance). This gives you a complete picture of their service.'
        },
        {
          id: 'negative-reviews',
          question: 'What if I see negative reviews?',
          answer: 'Negative reviews can be valuable - they show honest feedback and how contractors handle problems. Look at the contractor\'s response and overall rating pattern. A few negative reviews among many positive ones may not be concerning.'
        },
        {
          id: 'report-fake-review',
          question: 'How do I report a fake review?',
          answer: 'If you suspect a review is fake or inappropriate, click the "Report" button on the review. Our moderation team will investigate and take appropriate action. We take review authenticity very seriously.'
        },
        {
          id: 'update-review',
          question: 'Can I edit or delete my review?',
          answer: 'You can edit your review within 30 days of posting. After that, contact our support team if you need to make changes. Reviews can only be deleted in exceptional circumstances to maintain platform integrity.'
        },
        {
          id: 'review-photos',
          question: 'Can I add photos to my review?',
          answer: 'Yes! You can upload up to 5 photos with your review showing the completed work, before/after comparisons, or any issues encountered. Photos help other homeowners understand the quality of work and make informed decisions.'
        },
        {
          id: 'anonymous-reviews',
          question: 'Can I write anonymous reviews?',
          answer: 'Reviews are published with your first name and last initial (e.g., "John S.") to maintain some privacy while ensuring authenticity. Completely anonymous reviews are not allowed as they cannot be verified as legitimate customer experiences.'
        },
        {
          id: 'review-timing',
          question: 'When should I write a review?',
          answer: 'Write reviews after project completion when you can assess the full quality of work. For larger projects, consider waiting a few weeks to ensure everything functions properly. Prompt reviews help other homeowners and support contractors who did good work.'
        },
        {
          id: 'helpful-reviews',
          question: 'What makes a helpful review?',
          answer: 'Helpful reviews include specific details about the work performed, timeliness, communication quality, cleanliness, pricing fairness, and overall experience. Mention both positives and any concerns. Specific examples are more valuable than general statements.'
        },
        {
          id: 'review-disputes',
          question: 'What if a contractor disputes my review?',
          answer: 'Contractors can respond to reviews but cannot have them removed unless they violate our guidelines. If there\'s a factual dispute, our moderation team investigates. We protect honest reviews while preventing false or malicious content.'
        }
      ]
    },
    {
      id: 'safety',
      name: 'Safety & Trust',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      questions: [
        {
          id: 'contractor-screening',
          question: 'How do you screen contractors?',
          answer: 'We conduct thorough background checks, verify business licenses and insurance, check references, and review their work history. Only contractors who meet our strict standards receive verification badges.'
        },
        {
          id: 'insurance-coverage',
          question: 'Are contractors insured?',
          answer: 'All verified contractors must carry liability insurance and provide proof of coverage. However, we recommend confirming current insurance status directly with the contractor before starting any work.'
        },
        {
          id: 'dispute-resolution',
          question: 'What if I have a problem with a contractor?',
          answer: 'Contact our support team immediately. We have a dispute resolution process to help mediate issues between homeowners and contractors. We take all complaints seriously and work to find fair solutions.'
        },
        {
          id: 'payment-safety',
          question: 'Is it safe to pay contractors found on your platform?',
          answer: 'While we verify contractors, always follow safe payment practices: never pay large amounts upfront, use written contracts, and pay by check or credit card for protection. Be wary of contractors demanding cash payments.'
        },
        {
          id: 'red-flags',
          question: 'What are red flags to watch for?',
          answer: 'Be cautious of contractors who: demand full payment upfront, lack proper licensing/insurance, provide verbal-only estimates, pressure you to sign immediately, or have no local address. Trust your instincts and verify credentials independently.'
        },
        {
          id: 'verify-credentials',
          question: 'How can I independently verify contractor credentials?',
          answer: 'Check licenses through your state\'s licensing board website, verify insurance with the insurance company directly, search for business registration with the Secretary of State, check Better Business Bureau ratings, and ask for recent customer references you can contact.'
        },
        {
          id: 'contract-essentials',
          question: 'What should be included in a contract?',
          answer: 'Essential contract elements include: detailed scope of work, materials specifications, timeline with milestones, total cost breakdown, payment schedule, change order procedures, warranty information, cleanup responsibilities, and both parties\' signatures with dates.'
        },
        {
          id: 'insurance-claims',
          question: 'What if there\'s damage during the project?',
          answer: 'Immediately document any damage with photos, notify the contractor and their insurance company, file a claim if necessary, and contact our support team. Verified contractors carry insurance specifically to cover accidental damage during work.'
        },
        {
          id: 'permit-violations',
          question: 'What if work is done without proper permits?',
          answer: 'Unpermitted work can cause serious issues with insurance, resale, and safety. If you discover unpermitted work, stop the project, contact local building authorities, and consult with our support team. You may need to obtain retroactive permits.'
        },
        {
          id: 'emergency-situations',
          question: 'What should I do in emergency situations?',
          answer: 'For immediate safety hazards (gas leaks, electrical dangers, structural damage), evacuate if necessary and call emergency services first. Then contact the contractor and our support team. Document everything for insurance and resolution purposes.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      questions: [
        {
          id: 'account-issues',
          question: 'I\'m having trouble with my account',
          answer: 'For account-related issues, try clearing your browser cache and cookies first. If problems persist, contact our support team with details about the issue you\'re experiencing.'
        },
        {
          id: 'browser-compatibility',
          question: 'Which browsers are supported?',
          answer: 'Our platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. Make sure you\'re using the latest version for the best experience.'
        },
        {
          id: 'mobile-app',
          question: 'Do you have a mobile app?',
          answer: 'Currently, we offer a mobile-optimized website that works great on smartphones and tablets. A dedicated mobile app is in development and will be available soon.'
        },
        {
          id: 'contact-not-working',
          question: 'Contractor contact information isn\'t working',
          answer: 'If a phone number or email isn\'t working, please report it to us immediately. We\'ll verify the information with the contractor and update their profile. You can also try contacting them through alternative methods listed on their profile.'
        },
        {
          id: 'search-problems',
          question: 'Search isn\'t returning results',
          answer: 'Try broadening your search criteria - expand the location radius, remove specific filters, or use more general service categories. If you\'re still having trouble, contact support for assistance.'
        },
        {
          id: 'password-reset',
          question: 'I forgot my password',
          answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a secure link to reset your password. If you don\'t receive the email within a few minutes, check your spam folder.'
        },
        {
          id: 'delete-account',
          question: 'How do I delete my account?',
          answer: 'To delete your account, contact our support team. We\'ll help you remove your account and all associated data. Please note that this action cannot be undone, and you\'ll lose access to your reviews and account history.'
        }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing & Payments',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      questions: [
        {
          id: 'platform-costs',
          question: 'What does it cost to use the platform?',
          answer: 'For homeowners, our platform is completely free to use. You can search contractors, read reviews, and contact professionals at no cost. Contractors pay a small fee for premium features like featured listings, but basic profiles are free.'
        },
        {
          id: 'contractor-fees',
          question: 'What fees do contractors pay?',
          answer: 'Basic contractor profiles are free. We offer premium features including: Featured listings ($29/month), Enhanced profiles with photo galleries ($19/month), Priority placement in search results ($39/month), and Lead generation tools ($49/month). No setup fees or long-term contracts required.'
        },
        {
          id: 'payment-methods',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for contractor subscriptions. All payments are processed securely through encrypted payment gateways.'
        },
        {
          id: 'refund-policy',
          question: 'What is your refund policy?',
          answer: 'We offer a 30-day money-back guarantee for all premium contractor subscriptions. If you\'re not satisfied with our service, contact us within 30 days for a full refund. Refunds are processed within 5-7 business days.'
        },
        {
          id: 'billing-cycle',
          question: 'How does billing work?',
          answer: 'Premium subscriptions are billed monthly or annually (with a 20% discount for annual plans). Billing occurs on the same date each month. You can upgrade, downgrade, or cancel your subscription at any time from your account dashboard.'
        },
        {
          id: 'payment-to-contractors',
          question: 'Do I pay contractors through the platform?',
          answer: 'No, we don\'t process payments between homeowners and contractors. You pay contractors directly for their services. We recommend using secure payment methods like checks or credit cards, and always get written contracts before work begins.'
        }
      ]
    },
    {
      id: 'legal',
      name: 'Legal & Compliance',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      questions: [
        {
          id: 'licensing-requirements',
          question: 'What licensing requirements do contractors need?',
          answer: 'All contractors must have valid business licenses for their trade and location. Requirements vary by service type: plumbers need plumbing licenses, electricians need electrical licenses, etc. We verify all licenses before approving contractor profiles.'
        },
        {
          id: 'insurance-requirements',
          question: 'What insurance do contractors need?',
          answer: 'Contractors must carry general liability insurance (minimum $1 million coverage) and workers\' compensation insurance if they have employees. We verify insurance certificates and track expiration dates to ensure continuous coverage.'
        },
        {
          id: 'background-checks',
          question: 'Do you perform background checks?',
          answer: 'Yes, we conduct comprehensive background checks on all contractors including criminal history, business registration verification, license validation, and reference checks. Only contractors who pass our screening process receive verification badges.'
        },
        {
          id: 'liability-coverage',
          question: 'Are we liable if something goes wrong?',
          answer: 'Recommend a Contractor is a platform that connects homeowners with independent contractors. We are not liable for the work performed by contractors. However, all verified contractors carry insurance, and we have a dispute resolution process to help resolve issues.'
        },
        {
          id: 'terms-of-service',
          question: 'Where can I find your terms of service?',
          answer: 'Our complete Terms of Service and Privacy Policy are available at the bottom of every page. These documents outline user rights, responsibilities, and our data handling practices. We recommend reviewing them before using our platform.'
        },
        {
          id: 'data-privacy',
          question: 'How do you protect my personal information?',
          answer: 'We take data privacy seriously. We use industry-standard encryption, never sell personal information to third parties, and only share contact details with contractors you choose to contact. You can review our full Privacy Policy for detailed information.'
        }
      ]
    },
    {
      id: 'business',
      name: 'Business & Professional',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6',
      questions: [
        {
          id: 'contractor-benefits',
          question: 'What are the benefits of joining as a contractor?',
          answer: 'Benefits include: Access to qualified leads, verified customer reviews that build credibility, professional profile showcase, mobile-optimized presence, dispute resolution support, marketing tools, and analytics to track performance. Our platform helps you grow your business and build trust with customers.'
        },
        {
          id: 'lead-generation',
          question: 'How does lead generation work?',
          answer: 'When homeowners search for services in your area, your profile appears in results. Customers can contact you directly through phone or email. Premium members get priority placement, featured listings, and access to exclusive leads. You only pay for the subscription, not per lead.'
        },
        {
          id: 'profile-optimization',
          question: 'How can I optimize my contractor profile?',
          answer: 'Complete all profile sections, add high-quality photos of your work, maintain competitive pricing, respond quickly to inquiries, encourage satisfied customers to leave reviews, keep your availability calendar updated, and highlight your specialties and certifications.'
        },
        {
          id: 'review-management',
          question: 'How should I handle negative reviews?',
          answer: 'Respond professionally and promptly to all reviews. For negative reviews: acknowledge the customer\'s concerns, explain your side professionally, offer to resolve issues offline, and demonstrate your commitment to customer satisfaction. This shows potential customers how you handle problems.'
        },
        {
          id: 'competition-analysis',
          question: 'Can I see competitor information?',
          answer: 'You can view other contractors\' public profiles, ratings, and reviews just like customers do. This helps you understand market positioning and pricing. However, we don\'t provide detailed competitor analytics or private business information.'
        },
        {
          id: 'business-growth',
          question: 'How can the platform help grow my business?',
          answer: 'Our platform provides: increased online visibility, access to customers actively seeking services, credibility through verified reviews, professional marketing presence, mobile accessibility, and tools to track and improve performance. Many contractors see 20-40% business growth within the first year.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting & Tips',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      questions: [
        {
          id: 'best-practices-homeowners',
          question: 'What are best practices for hiring contractors?',
          answer: 'Always get multiple quotes (3-5), verify licenses and insurance independently, check references, get detailed written contracts, never pay large amounts upfront (10-15% max), communicate expectations clearly, and document everything. Trust your instincts if something feels wrong.'
        },
        {
          id: 'red-flags-contractors',
          question: 'What red flags should I watch for?',
          answer: 'Warning signs include: door-to-door solicitation, demands for full payment upfront, no written contract, no local address or license, pressure to sign immediately, prices significantly below market rate, no insurance proof, cash-only payments, and reluctance to provide references.'
        },
        {
          id: 'project-preparation',
          question: 'How should I prepare for a contractor visit?',
          answer: 'Clear the work area, secure valuables, prepare a list of questions, gather relevant documents (permits, warranties), take before photos, discuss timeline and expectations, confirm arrival time, and ensure someone will be present during the work.'
        },
        {
          id: 'communication-tips',
          question: 'How can I communicate effectively with contractors?',
          answer: 'Be clear about expectations, ask questions if unsure, document changes in writing, respond promptly to requests, provide access as needed, address concerns immediately, maintain professional relationships, and keep records of all communications.'
        },
        {
          id: 'quality-assurance',
          question: 'How do I ensure quality work?',
          answer: 'Research contractors thoroughly, check their previous work, verify credentials, get detailed contracts, monitor progress regularly, ask questions about materials and methods, request warranties, and don\'t make final payment until completely satisfied.'
        },
        {
          id: 'seasonal-considerations',
          question: 'Are there seasonal considerations for different projects?',
          answer: 'Yes! Roofing and exterior work are best in dry seasons, HVAC maintenance before peak seasons, plumbing before freezing weather, painting in moderate temperatures, and landscaping in spring/fall. Plan ahead as contractors are busiest during peak seasons.'
        }
      ]
    }
  ]);
  
  let searchQuery = $state('');
  let selectedCategory = $state('all');
  let openQuestions = $state<Set<string>>(new Set());
  let helpfulVotes = $state<Record<string, 'yes' | 'no' | null>>({});

  // Calculate FAQ statistics
  const faqStats = $derived.by(() => {
    const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const totalCategories = faqCategories.length;
    return { totalQuestions, totalCategories };
  });
  
  // Filter questions based on search and category
  let filteredCategories = $derived.by(() => {
    return faqCategories
      .map(category => ({
        ...category,
        questions: category.questions.filter(q => {
          const matchesSearch = !searchQuery ||
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesCategory = selectedCategory === 'all' || selectedCategory === category.id;

          return matchesSearch && matchesCategory;
        })
      }))
      .filter(category => category.questions.length > 0);
  });
  
  function toggleQuestion(questionId: string) {
    if (openQuestions.has(questionId)) {
      openQuestions.delete(questionId);
    } else {
      openQuestions.add(questionId);
    }
    openQuestions = new Set(openQuestions);
  }
  
  function expandAll() {
    const allQuestionIds = faqCategories.flatMap(cat => 
      cat.questions.map(q => q.id)
    );
    openQuestions = new Set(allQuestionIds);
  }
  
  function collapseAll() {
    openQuestions = new Set();
  }

  // Popular questions (most commonly asked)
  const popularQuestions = [
    { categoryId: 'general', questionId: 'how-it-works' },
    { categoryId: 'homeowners', questionId: 'find-contractors' },
    { categoryId: 'homeowners', questionId: 'verify-contractors' },
    { categoryId: 'contractors', questionId: 'join-platform' },
    { categoryId: 'reviews', questionId: 'verified-reviews' },
    { categoryId: 'safety', questionId: 'contractor-screening' },
    { categoryId: 'pricing', questionId: 'platform-costs' },
    { categoryId: 'troubleshooting', questionId: 'best-practices-homeowners' }
  ];

  function jumpToQuestion(categoryId: string, questionId: string) {
    selectedCategory = categoryId;
    setTimeout(() => {
      openQuestions.add(questionId);
      openQuestions = new Set(openQuestions);
      const element = document.getElementById(questionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  function voteHelpful(questionId: string, vote: 'yes' | 'no') {
    helpfulVotes[questionId] = vote;
    helpfulVotes = { ...helpfulVotes };

    // In a real app, this would send the vote to the server
    console.log(`Question ${questionId} voted as ${vote === 'yes' ? 'helpful' : 'not helpful'}`);
  }
</script>

<svelte:head>
  <title>Frequently Asked Questions - Recommend a Contractor</title>
  <meta name="description" content="Find answers to common questions about using Recommend a Contractor, our verification process, reviews, and how to connect with trusted contractors in Denver." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Find answers to common questions about using our platform,
        connecting with contractors, and making the most of our services.
      </p>

      <!-- FAQ Stats -->
      <div class="flex justify-center space-x-8 text-sm text-gray-500">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{faqStats.totalQuestions} Questions</span>
        </div>
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span>{faqStats.totalCategories} Categories</span>
        </div>
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Updated Weekly</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Search and Filters -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <!-- Search -->
        <div class="flex-1 relative">
          <input
            bind:value={searchQuery}
            type="text"
            placeholder="Search questions..."
            class="input pl-10 w-full"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <!-- Category Filter -->
        <select bind:value={selectedCategory} class="input w-full md:w-auto">
          <option value="all">All Categories</option>
          {#each faqCategories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
        
        <!-- Expand/Collapse Controls -->
        <div class="flex space-x-2">
          <button onclick={expandAll} class="btn btn-outline btn-sm">
            Expand All
          </button>
          <button onclick={collapseAll} class="btn btn-outline btn-sm">
            Collapse All
          </button>
        </div>
      </div>
      
      <!-- Quick Category Navigation -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {#each faqCategories as category}
          <button
            onclick={() => selectedCategory = selectedCategory === category.id ? 'all' : category.id}
            class="p-4 rounded-lg border-2 transition-all duration-200 {
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }"
          >
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={category.icon}></path>
            </svg>
            <div class="text-sm font-medium">{category.name}</div>
          </button>
        {/each}
      </div>

      <!-- Popular Questions -->
      {#if !searchQuery && selectedCategory === 'all'}
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">Most Popular Questions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {#each popularQuestions as popular}
              {@const category = faqCategories.find(c => c.id === popular.categoryId)}
              {@const question = category?.questions.find(q => q.id === popular.questionId)}
              {#if question && category}
                <button
                  onclick={() => jumpToQuestion(popular.categoryId, popular.questionId)}
                  class="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div class="flex items-start space-x-3">
                    <svg class="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <div class="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                        {question.question}
                      </div>
                      <div class="text-xs text-gray-500 mt-1">
                        {category.name}
                      </div>
                    </div>
                  </div>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- FAQ Content -->
<section class="section-padding">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <!-- Search Results Counter -->
      {#if searchQuery || selectedCategory !== 'all'}
        {@const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0)}
        <div class="mb-6 text-center">
          <p class="text-sm text-gray-600">
            {#if searchQuery && selectedCategory !== 'all'}
              Showing {totalResults} results for "{searchQuery}" in {faqCategories.find(c => c.id === selectedCategory)?.name}
            {:else if searchQuery}
              Showing {totalResults} results for "{searchQuery}"
            {:else}
              Showing {totalResults} questions in {faqCategories.find(c => c.id === selectedCategory)?.name}
            {/if}
          </p>
        </div>
      {/if}

      {#if filteredCategories.length === 0}
        <div class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0a7.962 7.962 0 105.824 8.562M9.172 16.172L6.343 19.01a.5.5 0 01-.707-.707l2.828-2.829a4 4 0 010-5.656l2.829-2.829a.5.5 0 01.707.707l-2.828 2.829z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your search terms or category filter.</p>
          <div class="flex justify-center space-x-3">
            <button onclick={() => searchQuery = ''} class="btn btn-outline btn-sm">
              Clear Search
            </button>
            <button onclick={() => selectedCategory = 'all'} class="btn btn-outline btn-sm">
              Show All Categories
            </button>
          </div>
        </div>
      {:else}
        <div class="space-y-8">
          {#each filteredCategories as category}
            <div class="space-y-4">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={category.icon}></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">{category.name}</h2>
              </div>
              
              <div class="space-y-3">
                {#each category.questions as question}
                  <div id={question.id} class="card overflow-hidden">
                    <button
                      onclick={() => toggleQuestion(question.id)}
                      class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 class="text-lg font-medium text-gray-900 pr-4">
                        {question.question}
                      </h3>
                      <svg 
                        class="w-5 h-5 text-gray-500 transform transition-transform duration-200 {
                          openQuestions.has(question.id) ? 'rotate-180' : ''
                        }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    
                    {#if openQuestions.has(question.id)}
                      <div class="px-6 pb-4 border-t border-gray-100">
                        <div class="pt-4 text-gray-700 leading-relaxed mb-4">
                          {question.answer}
                        </div>

                        <!-- Helpful Voting -->
                        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span class="text-sm text-gray-600">Was this helpful?</span>
                          <div class="flex items-center space-x-2">
                            {#if helpfulVotes[question.id] === null || helpfulVotes[question.id] === undefined}
                              <button
                                onclick={() => voteHelpful(question.id, 'yes')}
                                class="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7m5 3v4M9 7H7l-3-3M9 7l.6-2.4"></path>
                                </svg>
                                <span>Yes</span>
                              </button>
                              <button
                                onclick={() => voteHelpful(question.id, 'no')}
                                class="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L15 17m-7-10V9a2 2 0 012-2h.095c.5 0 .905.405.905.905 0 .714.211 1.412.608 2.006L15 7"></path>
                                </svg>
                                <span>No</span>
                              </button>
                            {:else}
                              <div class="flex items-center space-x-2 text-sm">
                                {#if helpfulVotes[question.id] === 'yes'}
                                  <div class="flex items-center space-x-1 text-green-600">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7m5 3v4M9 7H7l-3-3M9 7l.6-2.4"></path>
                                    </svg>
                                    <span>Thanks for your feedback!</span>
                                  </div>
                                {:else}
                                  <div class="flex items-center space-x-1 text-red-600">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L15 17m-7-10V9a2 2 0 012-2h.095c.5 0 .905.405.905.905 0 .714.211 1.412.608 2.006L15 7"></path>
                                    </svg>
                                    <span>We'll work to improve this answer</span>
                                  </div>
                                {/if}
                                <button
                                  onclick={() => helpfulVotes[question.id] = null}
                                  class="text-xs text-gray-400 hover:text-gray-600 ml-2"
                                >
                                  Reset
                                </button>
                              </div>
                            {/if}
                          </div>
                        </div>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Contact Support Section -->
<section class="section-padding bg-blue-600 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-4">Still Have Questions?</h2>
    <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
      Can't find the answer you're looking for? Our support team is here to help you 
      get the most out of our platform.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <svg class="w-8 h-8 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <h3 class="font-semibold mb-2">Email Support</h3>
        <p class="text-blue-200 text-sm mb-3">Get detailed help via email</p>
        <a href="mailto:support@recomendacontractor.com" class="text-white hover:text-blue-200 text-sm font-medium">
          support@recomendacontractor.com
        </a>
      </div>
      
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <svg class="w-8 h-8 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
        <h3 class="font-semibold mb-2">Phone Support</h3>
        <p class="text-blue-200 text-sm mb-3">Speak with our team directly</p>
        <a href="tel:(303) 555-0199" class="text-white hover:text-blue-200 text-sm font-medium">
          (303) 555-0199
        </a>
        <p class="text-xs text-blue-200 mt-1">Mon-Fri, 9 AM - 6 PM MST</p>
      </div>
      
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <svg class="w-8 h-8 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <h3 class="font-semibold mb-2">Contact Form</h3>
        <p class="text-blue-200 text-sm mb-3">Send us a detailed message</p>
        <a href="/contact" class="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-blue-600">
          Contact Us
        </a>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
        Contact Support
      </a>
      <a href="/about" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600">
        Learn More About Us
      </a>
    </div>
  </div>
</section>
