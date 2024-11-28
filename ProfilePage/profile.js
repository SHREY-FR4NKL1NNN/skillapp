 // JavaScript to handle profile updates
 document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const countryInput = document.getElementById('country');
    const phoneNumberInput = document.getElementById('phone-number');
    const skillsContainer = document.getElementById('skills-container');
    const username = localStorage.getItem('username');
        const country = localStorage.getItem('country');
        const phoneNumber = localStorage.getItem('phoneNumber');

        document.getElementById('username').textContent = username;
        document.getElementById('country').textContent = country;
        document.getElementById('phone-number').textContent = phoneNumber;

    document.getElementById('skills-add').addEventListener('click', function() {
        const newSkillDiv = document.createElement('div');
        newSkillDiv.classList.add('skill-item');
        newSkillDiv.contentEditable = true;
        newSkillDiv.innerHTML = `<span></span><div class="skill-rating"><span>★★★★★</span></div>`;
        skillsContainer.appendChild(newSkillDiv);
    });

    document.getElementById('skills-remove').addEventListener('click', function() {
        const skills = skillsContainer.children;
        if (skills.length > 0) {
            skills[skills.length - 1].remove();
        }
    });

    document.getElementById('profile-update').addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const country = countryInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        const skills = [];
        for (const skill of skillsContainer.children) {
            skills.push(skill.firstElementChild.textContent.trim());
        }
        localStorage.setItem('username', username);
        localStorage.setItem('country', country);
        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('skills', JSON.stringify(skills));
        alert('Profile updated!');
    });

    // Set the initial values from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedCountry = localStorage.getItem('country');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedSkills = JSON.parse(localStorage.getItem('skills'));

    if (storedUsername) usernameInput.value = storedUsername;
    if (storedCountry) countryInput.value = storedCountry;
    if (storedPhoneNumber) phoneNumberInput.value = storedPhoneNumber;
    if (storedSkills && storedSkills.length > 0) {
        storedSkills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill-item');
            skillDiv.contentEditable = true;
            skillDiv.innerHTML = `<span>${skill}</span><div class="skill-rating"><span>★★★★★</span></div>`;
            skillsContainer.appendChild(skillDiv);
        });
    }
});
