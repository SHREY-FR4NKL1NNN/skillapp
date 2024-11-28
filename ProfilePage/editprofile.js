        const form = document.querySelector('.edit-profile-form');
        const profilePictureInput = document.getElementById('profile-picture');
        const usernameInput = document.getElementById('username');
        const countryInput = document.getElementById('country');
        const phoneNumberInput = document.getElementById('phone-number');
        const skillsInput = document.getElementById('skills');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const profilePicture = profilePictureInput.files[0];
            const username = usernameInput.value;
            const country = countryInput.value;
            const phoneNumber = phoneNumberInput.value;
            const skills = skillsInput.value.split(',');
            localStorage.setItem('profilePicture', profilePicture);
            localStorage.setItem('username', username);
            localStorage.setItem('country', country);
            localStorage.setItem('phoneNumber', phoneNumber);
            localStorage.setItem('skills', JSON.stringify(skills));
            alert('Profile edited successfully!');
            window.location.href = "../ProfilePage/profile.html";
        });
        const skills = [];
        const skillInput = document.getElementById('skill-input');
        const skillsList = document.getElementById('skills-list');
        const addSkillButton = document.getElementById('add-skill');

        addSkillButton.addEventListener('click', () => {
            const skill = skillInput.value.trim();
            if (skill) {
                skills.push(skill);
                const listItem = document.createElement('li');
                listItem.textContent = skill;
                skillsList.appendChild(listItem);
                skillInput.value = '';
            }
        });
    