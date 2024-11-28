const form = document.getElementById('complete-account-form');
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

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const country = document.getElementById('country').value;
            const phoneNumber = document.getElementById('phone-number').value;
            localStorage.setItem('username', username);
            localStorage.setItem('skills', JSON.stringify(skills));
            localStorage.setItem('country', country);
            localStorage.setItem('phoneNumber', phoneNumber);
            alert('Account setup complete!');
            window.location.href = "../homePage/afterHomePage.html";
        });