import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import './styles/FAQPage.css';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click on the 'Sign Up' button in the top right corner of our website. Fill in your personal information including your name, email address, and password. Once you submit the form, you'll receive a confirmation email. Click the link in the email to verify your account and you're all set!",
      category: 'account'
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a variety of payment methods including all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption to ensure your payment information is safe.",
      category: 'payments'
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive an email with a tracking number and a link to track your package. You can also track your order by logging into your account and viewing your order history. Click on the specific order to see the tracking information.",
      category: 'orders'
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy from the date of delivery. Items must be unused, in their original packaging, and in the same condition you received them. To initiate a return, please contact our customer service team or use the return portal in your account. Refunds are processed within 5-7 business days after we receive the returned item.",
      category: 'returns'
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide! International shipping rates and delivery times vary depending on your location. You can check if we ship to your country and see the rates at checkout. Please note that international orders may be subject to customs fees and import duties.",
      category: 'orders'
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping within the US typically takes 5-7 business days. Express shipping takes 2-3 business days. International shipping times vary by location but generally take 10-20 business days. You'll find exact shipping estimates at checkout before you complete your purchase.",
      category: 'orders'
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 2 hours of placement. After this time, the order enters our fulfillment process and cannot be changed. If you need to make changes after this period, you'll need to return the items once received.",
      category: 'orders'
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer gift wrapping services for a small additional fee. You can select gift wrapping options at checkout and include a personalized message. Gift wrapped items are beautifully presented in our signature packaging.",
      category: 'orders'
    },
    {
      question: "How do I use a discount code?",
      answer: "To use a discount code, add items to your cart and proceed to checkout. You'll see a field labeled 'Discount Code' or 'Promo Code' where you can enter your code. Click 'Apply' and the discount will be reflected in your total. Only one discount code can be used per order.",
      category: 'payments'
    },
    {
      question: "What if I receive a damaged item?",
      answer: "We apologize if you receive a damaged item. Please contact our customer service team immediately with your order number and photos of the damage. We'll arrange for a replacement to be sent to you at no additional cost, or process a full refund if you prefer.",
      category: 'returns'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'payments', name: 'Payments' },
    { id: 'account', name: 'Account' }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (faqIndex) => {
    setActiveIndex(activeIndex === faqIndex ? null : faqIndex);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveIndex(null); // Reset active FAQ when changing category
  };

  const getOriginalIndex = (filteredFaq) => {
    return faqs.findIndex(faq => faq.question === filteredFaq.question);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <div className="faq-icon">
            <FiHelpCircle size={48} />
          </div>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products, services, and policies.</p>
        </div>

        <div className="faq-categories">
          <div className="category-tabs">
            {categories.map((category) => (
              <button 
                key={category.id}
                className={`tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {filteredFAQs.map((faq, filteredIndex) => {
              const originalIndex = getOriginalIndex(faq);
              return (
                <div key={originalIndex} className="faq-item">
                  <button
                    className={`faq-question ${activeIndex === originalIndex ? 'active' : ''}`}
                    onClick={() => toggleFAQ(originalIndex)}
                  >
                    <span>{faq.question}</span>
                    {activeIndex === originalIndex ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </button>
                  <div className={`faq-answer ${activeIndex === originalIndex ? 'active' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="faq-help">
          <div className="help-card">
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Our customer support team is here to help!</p>
            <div className="help-actions">
              <a href="/contact" className="btn btn-primary">Contact Support</a>
              <a href="mailto:support@nova.com" className="btn btn-outline">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
