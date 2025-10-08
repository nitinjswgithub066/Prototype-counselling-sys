/**
 * SkillPath Navigator - Main JavaScript
 * AI-Enabled Personalized Guidance System for NCVET
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Demo Video Modal
    const demoVideoButton = document.getElementById('demoVideoButton');
    if (demoVideoButton) {
        demoVideoButton.addEventListener('click', () => {
            const demoModal = new bootstrap.Modal(document.getElementById('demoVideoModal'));
            demoModal.show();
        });
    }

    // Close YouTube video when modal is closed
    const demoVideoModal = document.getElementById('demoVideoModal');
    if (demoVideoModal) {
        demoVideoModal.addEventListener('hidden.bs.modal', function () {
            const iframe = demoVideoModal.querySelector('iframe');
            const iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Page loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
});

// AI Assessment Form Functions
function initAssessmentForm() {
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        const formSections = document.querySelectorAll('.form-section');
        const formProgress = document.querySelector('.form-progress-bar');
        const nextBtns = document.querySelectorAll('.next-step');
        const prevBtns = document.querySelectorAll('.prev-step');
        let currentSection = 0;
        
        // Update progress bar
        function updateProgress() {
            const percentage = ((currentSection + 1) / formSections.length) * 100;
            formProgress.style.width = `${percentage}%`;
            document.querySelector('.progress-text').textContent = `${currentSection + 1} / ${formSections.length}`;
        }
        
        // Show current section
        function showSection(index) {
            formSections.forEach((section, i) => {
                section.style.display = i === index ? 'block' : 'none';
            });
            updateProgress();
        }
        
        // Initialize form
        showSection(currentSection);
        
        // Next button event listeners
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateSection(currentSection)) {
                    currentSection++;
                    if (currentSection < formSections.length) {
                        showSection(currentSection);
                        window.scrollTo({top: assessmentForm.offsetTop - 80, behavior: 'smooth'});
                    }
                }
            });
        });
        
        // Previous button event listeners
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentSection--;
                if (currentSection >= 0) {
                    showSection(currentSection);
                    window.scrollTo({top: assessmentForm.offsetTop - 80, behavior: 'smooth'});
                }
            });
        });
        
        // Form validation for each section
        function validateSection(sectionIndex) {
            const currentSectionEl = formSections[sectionIndex];
            const requiredFields = currentSectionEl.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    valid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!valid) {
                const errorAlert = currentSectionEl.querySelector('.validation-error');
                if (errorAlert) {
                    errorAlert.style.display = 'block';
                    setTimeout(() => {
                        errorAlert.style.display = 'none';
                    }, 3000);
                }
            }
            
            return valid;
        }
        
        // Submit form
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSection(currentSection)) {
                // Show loading
                const submitBtn = this.querySelector('[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
                
                // Simulate API call
                setTimeout(() => {
                    // Hide form and show success message
                    document.getElementById('assessmentContainer').style.display = 'none';
                    document.getElementById('resultsContainer').style.display = 'block';
                    
                    // Generate personalized recommendations
                    generateRecommendations();
                    
                    // Scroll to results
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }, 2000);
            }
        });
    }
}

// Generate personalized recommendations based on form data
function generateRecommendations() {
    // In a real implementation, this would use AI to process the assessment data
    // For this prototype, we'll simulate the AI processing
    
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;
    
    // Display user profile summary
    const userProfile = {
        name: document.getElementById('fullName')?.value || 'Test User',
        education: document.getElementById('educationLevel')?.value || 'High School',
        location: document.getElementById('location')?.value || 'Delhi',
        interests: ['Technology', 'Healthcare', 'Manufacturing']
    };
    
    document.getElementById('userProfileName').textContent = userProfile.name;
    document.getElementById('userProfileEducation').textContent = userProfile.education;
    document.getElementById('userProfileLocation').textContent = userProfile.location;
    
    // Generate career paths (in a real system, these would come from the AI analysis)
    const careerPaths = [
        {
            title: 'IT Support Specialist',
            nsqfLevel: 5,
            description: 'Provide technical support to end users, troubleshoot hardware and software issues.',
            courses: [
                'Certificate in Computer Hardware Maintenance',
                'Network Administration Fundamentals',
                'Customer Support Communication'
            ],
            demandScore: 85,
            matchScore: 92
        },
        {
            title: 'Healthcare Assistant',
            nsqfLevel: 4,
            description: 'Assist medical professionals in patient care, record keeping, and basic medical procedures.',
            courses: [
                'Basic Nursing Assistant Training',
                'Medical Terminology',
                'Patient Care Ethics'
            ],
            demandScore: 90,
            matchScore: 78
        },
        {
            title: 'CNC Machine Operator',
            nsqfLevel: 4,
            description: 'Operate computer numerical control machines to produce precision parts and instruments.',
            courses: [
                'Introduction to CNC Programming',
                'Machine Tool Operation',
                'Industrial Safety'
            ],
            demandScore: 75,
            matchScore: 65
        }
    ];
    
    // Render career paths
    const careerPathsContainer = document.getElementById('careerPathsContainer');
    if (careerPathsContainer) {
        careerPathsContainer.innerHTML = '';
        
        careerPaths.forEach(career => {
            const careerCard = document.createElement('div');
            careerCard.className = 'col-md-4 mb-4';
            careerCard.innerHTML = `
                <div class="career-card">
                    <div class="career-header">
                        <h3>${career.title}</h3>
                        <span class="nsqf-level">NSQF Level ${career.nsqfLevel}</span>
                    </div>
                    <p>${career.description}</p>
                    <div class="career-scores">
                        <div class="score-item">
                            <div class="score-label">Match</div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${career.matchScore}%" 
                                    aria-valuenow="${career.matchScore}" aria-valuemin="0" aria-valuemax="100">${career.matchScore}%</div>
                            </div>
                        </div>
                        <div class="score-item">
                            <div class="score-label">Demand</div>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${career.demandScore}%" 
                                    aria-valuenow="${career.demandScore}" aria-valuemin="0" aria-valuemax="100">${career.demandScore}%</div>
                            </div>
                        </div>
                    </div>
                    <h4>Recommended Courses</h4>
                    <ul>
                        ${career.courses.map(course => `<li>${course}</li>`).join('')}
                    </ul>
                    <a href="#" class="btn btn-outline-primary btn-sm">View Full Pathway</a>
                </div>
            `;
            
            careerPathsContainer.appendChild(careerCard);
        });
    }
    
    // Initialize charts if they exist
    initResultCharts();
}

// Initialize dashboard charts
function initResultCharts() {
    // Skills radar chart
    const skillsChartEl = document.getElementById('skillsChart');
    if (skillsChartEl) {
        new Chart(skillsChartEl, {
            type: 'radar',
            data: {
                labels: ['Technical', 'Communication', 'Problem Solving', 'Teamwork', 'Adaptability', 'Creativity'],
                datasets: [{
                    label: 'Your Skills',
                    data: [70, 85, 65, 80, 75, 60],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    pointBackgroundColor: 'rgba(67, 97, 238, 1)'
                }, {
                    label: 'Industry Average',
                    data: [80, 70, 75, 65, 70, 70],
                    backgroundColor: 'rgba(76, 201, 240, 0.2)',
                    borderColor: 'rgba(76, 201, 240, 1)',
                    pointBackgroundColor: 'rgba(76, 201, 240, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Industry demand chart
    const demandChartEl = document.getElementById('industryDemandChart');
    if (demandChartEl) {
        new Chart(demandChartEl, {
            type: 'bar',
            data: {
                labels: ['IT', 'Healthcare', 'Manufacturing', 'Retail', 'Construction'],
                datasets: [{
                    label: 'Current Demand',
                    data: [85, 90, 75, 60, 70],
                    backgroundColor: 'rgba(67, 97, 238, 0.7)'
                }, {
                    label: 'Projected Growth (5 Years)',
                    data: [95, 85, 80, 65, 75],
                    backgroundColor: 'rgba(76, 201, 240, 0.7)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// Initialize dashboard if on dashboard page
function initDashboard() {
    const dashboard = document.querySelector('.dashboard-container');
    if (!dashboard) return;
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // For the profile page profile editing functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    if (editProfileBtn && saveProfileBtn && cancelEditBtn) {
        const viewSections = document.querySelectorAll('.view-section');
        const editSections = document.querySelectorAll('.edit-section');
        
        // Enable edit mode
        editProfileBtn.addEventListener('click', function() {
            editProfileBtn.classList.add('d-none');
            saveProfileBtn.classList.remove('d-none');
            cancelEditBtn.classList.remove('d-none');
            
            viewSections.forEach(section => section.classList.add('hidden'));
            editSections.forEach(section => section.classList.add('active'));
        });
        
        // Save changes
        saveProfileBtn.addEventListener('click', function() {
            saveProfileBtn.classList.add('d-none');
            cancelEditBtn.classList.add('d-none');
            editProfileBtn.classList.remove('d-none');
            
            editSections.forEach(section => section.classList.remove('active'));
            viewSections.forEach(section => section.classList.remove('hidden'));
            
            // Here would be code to save the data to a server
            alert("Profile updated successfully!");
        });
        
        // Cancel editing
        cancelEditBtn.addEventListener('click', function() {
            saveProfileBtn.classList.add('d-none');
            cancelEditBtn.classList.add('d-none');
            editProfileBtn.classList.remove('d-none');
            
            editSections.forEach(section => section.classList.remove('active'));
            viewSections.forEach(section => section.classList.remove('hidden'));
        });
    }
    
    // Initialize dashboard charts
    const skillProgressCanvas = document.getElementById('skillProgressChart');
    if (skillProgressCanvas) {
        new Chart(skillProgressCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Technical Skills',
                    data: [30, 40, 45, 50, 65, 70],
                    borderColor: 'rgba(67, 97, 238, 1)',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Soft Skills',
                    data: [45, 55, 60, 65, 70, 85],
                    borderColor: 'rgba(76, 201, 240, 1)',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    }
    
    // Course completion donut chart
    const courseProgressCanvas = document.getElementById('courseProgressChart');
    if (courseProgressCanvas) {
        new Chart(courseProgressCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: [60, 30, 10],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ]
                }]
            },
            options: {
                cutout: '70%'
            }
        });
    }
    
    // Career match gauge chart
    const careerMatchCanvas = document.getElementById('careerMatchChart');
    if (careerMatchCanvas) {
        new Chart(careerMatchCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Match', 'Gap'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.8)',
                        'rgba(233, 236, 239, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                plugins: {
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }
    
    // Initialize skills radar chart if it exists (new dashboard)
    const skillsRadarChart = document.getElementById('skillsRadarChart');
    if (skillsRadarChart) {
        new Chart(skillsRadarChart, {
            type: 'radar',
            data: {
                labels: [
                    'Network Setup',
                    'Troubleshooting',
                    'System Config',
                    'Cloud Services',
                    'Hardware',
                    'Security'
                ],
                datasets: [{
                    label: 'Your Skills',
                    data: [85, 65, 70, 40, 80, 55],
                    fill: true,
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: 'rgb(67, 97, 238)',
                    pointBackgroundColor: 'rgb(67, 97, 238)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(67, 97, 238)'
                }, {
                    label: 'Industry Benchmark',
                    data: [75, 70, 75, 70, 65, 70],
                    fill: true,
                    backgroundColor: 'rgba(76, 201, 240, 0.2)',
                    borderColor: 'rgb(76, 201, 240)',
                    pointBackgroundColor: 'rgb(76, 201, 240)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(76, 201, 240)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 2
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(210, 210, 210, 0.3)'
                        },
                        ticks: {
                            display: false,
                            backdropColor: 'transparent'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Initialize progress chart if it exists (new dashboard)
    const progressChart = document.getElementById('progressChart');
    if (progressChart) {
        new Chart(progressChart, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Technical Skills',
                    data: [50, 55, 60, 68, 75],
                    fill: true,
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderColor: 'rgb(67, 97, 238)',
                    tension: 0.3
                }, {
                    label: 'Practical Skills',
                    data: [40, 45, 55, 60, 65],
                    fill: true,
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    borderColor: 'rgb(76, 201, 240)',
                    tension: 0.3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                maintainAspectRatio: false
            }
        });
    }
    
    // Initialize match chart if it exists (new dashboard)
    const matchChart = document.getElementById('matchChart');
    if (matchChart) {
        new Chart(matchChart, {
            type: 'doughnut',
            data: {
                labels: ['Match', 'Gap'],
                datasets: [{
                    label: 'Career Match',
                    data: [85, 15],
                    backgroundColor: [
                        'rgb(67, 97, 238)',
                        'rgba(220, 220, 220, 0.3)'
                    ],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }
}

// Initialize the demo page interactive elements
function initDemo() {
    const demoContainer = document.querySelector('.demo-container');
    if (!demoContainer) return;
    
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            profileCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show loading state
            document.querySelector('.demo-result').innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3">AI is analyzing the profile...</p>
                </div>
            `;
            
            // Simulate AI processing
            setTimeout(() => {
                // Get data from selected profile
                const profileId = this.getAttribute('data-profile');
                loadDemoProfile(profileId);
            }, 1500);
        });
    });
    
    // Initial load of first profile
    loadDemoProfile('1');
}

// Load demo profile data
function loadDemoProfile(profileId) {
    // This would typically fetch from an API, but we'll use static data for the prototype
    const profiles = {
        '1': {
            name: 'Rahul Sharma',
            age: 19,
            education: '12th Standard (Science)',
            location: 'Mumbai',
            interests: ['Technology', 'Engineering', 'Design'],
            careerPath: {
                title: 'Computer Network Technician',
                nsqfLevel: 4,
                matchScore: 88,
                courses: [
                    'Certificate in Network Administration',
                    'Cisco Certified Network Associate (CCNA)',
                    'IT Troubleshooting Fundamentals'
                ],
                timeline: [
                    { title: '3 months', description: 'Basic Computer Networking Course' },
                    { title: '6 months', description: 'Network Administration Certificate' },
                    { title: '1 year', description: 'CCNA Certification' },
                    { title: '1.5 years', description: 'Industry Internship' }
                ]
            }
        },
        '2': {
            name: 'Priya Patel',
            age: 22,
            education: 'Bachelor of Arts',
            location: 'Delhi',
            interests: ['Design', 'Media', 'Communication'],
            careerPath: {
                title: 'Digital Marketing Specialist',
                nsqfLevel: 5,
                matchScore: 92,
                courses: [
                    'Digital Marketing Fundamentals',
                    'Social Media Management',
                    'Content Creation & Analytics'
                ],
                timeline: [
                    { title: '2 months', description: 'Digital Marketing Basics' },
                    { title: '4 months', description: 'Social Media Marketing Certificate' },
                    { title: '8 months', description: 'Google Ads Certification' },
                    { title: '1 year', description: 'Marketing Agency Internship' }
                ]
            }
        },
        '3': {
            name: 'Amit Kumar',
            age: 28,
            education: 'ITI Mechanic',
            location: 'Pune',
            interests: ['Manufacturing', 'Automation', 'Mechanics'],
            careerPath: {
                title: 'CNC Programmer & Operator',
                nsqfLevel: 5,
                matchScore: 85,
                courses: [
                    'Advanced CNC Programming',
                    'Computer-Aided Manufacturing',
                    'Industrial Automation Basics'
                ],
                timeline: [
                    { title: '3 months', description: 'CNC Operation Fundamentals' },
                    { title: '6 months', description: 'Advanced CNC Programming' },
                    { title: '9 months', description: 'CAM Software Certification' },
                    { title: '1 year', description: 'Manufacturing Placement' }
                ]
            }
        }
    };
    
    const profile = profiles[profileId];
    if (!profile) return;
    
    // Update demo result container
    const resultContainer = document.querySelector('.demo-result');
    resultContainer.innerHTML = `
        <div class="profile-summary">
            <div class="profile-header">
                <h3>${profile.name}</h3>
                <span class="badge bg-secondary">${profile.age} years</span>
            </div>
            <div class="profile-details">
                <p><strong>Education:</strong> ${profile.education}</p>
                <p><strong>Location:</strong> ${profile.location}</p>
                <p><strong>Interests:</strong> ${profile.interests.join(', ')}</p>
            </div>
        </div>
        
        <div class="recommendation-container">
            <div class="recommendation-header">
                <h4>AI Recommended Career Path</h4>
                <div class="match-badge">
                    <span>Match Score</span>
                    <div class="badge bg-primary">${profile.careerPath.matchScore}%</div>
                </div>
            </div>
            
            <div class="career-title">
                <h3>${profile.careerPath.title}</h3>
                <span class="nsqf-badge">NSQF Level ${profile.careerPath.nsqfLevel}</span>
            </div>
            
            <h5>Recommended Courses</h5>
            <ul class="recommended-courses">
                ${profile.careerPath.courses.map(course => `<li>${course}</li>`).join('')}
            </ul>
            
            <h5>Learning Timeline</h5>
            <div class="demo-timeline">
                ${profile.careerPath.timeline.map(item => `
                    <div class="demo-timeline-item">
                        <div class="demo-timeline-marker"></div>
                        <div class="demo-timeline-content">
                            <h6>${item.title}</h6>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="action-buttons mt-4">
                <a href="#" class="btn btn-primary">Explore This Pathway</a>
                <a href="#" class="btn btn-outline-secondary ms-2">View Alternatives</a>
            </div>
        </div>
    `;
}

// Call initialization functions based on current page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize assessment form if on assessment page
    initAssessmentForm();
    
    // Initialize dashboard if on dashboard page
    initDashboard();
    
    // Initialize demo page
    initDemo();
});