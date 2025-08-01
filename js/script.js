// Interactions and animations for HAUTE TRAVELING MEDIA GROUP

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Form submission handling
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');
    const btnText = form?.querySelector('.btn-text');
    const btnLoading = form?.querySelector('.btn-loading');
    const successMessage = form?.querySelector('.success-message');
    const errorMessage = form?.querySelector('.error-message');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide any existing messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                errorMessage.style.display = 'block';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
            }
        });
        
        // Client-side validation enhancement
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderBottomColor = '#a00';
                } else {
                    this.style.borderBottomColor = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderBottomColor = '';
                }
            });
        });
        
        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderBottomColor = '#a00';
                }
            });
        }
    }
    
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
`;
document.head.appendChild(style);