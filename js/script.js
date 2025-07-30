// Form handling and interactions for HAUTE TRAVELING MEDIA GROUP

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Form submission handler
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            companyName: document.getElementById('companyName').value.trim(),
            propertyType: document.getElementById('propertyType').value.trim(),
            location: document.getElementById('location').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form data
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }, 2000);
        
        // Log form data (for development - remove in production)
        console.log('Form submitted with data:', formData);
    }
    
    // Form validation
    function validateForm(data) {
        // Check required fields
        if (!data.fullName || !data.email || !data.companyName || !data.message) {
            showErrorMessage('Please fill in all required fields.');
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showErrorMessage('Please enter a valid email address.');
            return false;
        }
        
        // Validate message length
        if (data.message.length < 20) {
            showErrorMessage('Please provide more details about your property and interests (minimum 20 characters).');
            return false;
        }
        
        return true;
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success-message';
        successDiv.textContent = 'Thank you for your interest! We will contact you soon.';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 20px 30px;
            border-radius: 4px;
            font-size: 14px;
            letter-spacing: 1px;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 20px 30px;
            border-radius: 4px;
            font-size: 14px;
            letter-spacing: 1px;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 4000);
    }
    
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Animate stats numbers on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Animate stat numbers
    function animateStatNumber(element) {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const hasPlus = finalValue.includes('+');
        const hasM = finalValue.includes('M');
        const hasB = finalValue.includes('B');
        
        let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.round(currentValue);
            if (hasM) displayValue += 'M';
            if (hasB) displayValue += 'B';
            if (hasPlus) displayValue += '+';
            if (isPercentage) displayValue += '%';
            
            element.textContent = displayValue;
        }, stepTime);
    }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-bottom-color: #fff;
    }
`;
document.head.appendChild(style);