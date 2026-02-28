document.addEventListener('DOMContentLoaded', function () { 
    const tabs = document.querySelectorAll('.standard-tab-link');
    const panes = document.querySelectorAll('.standard-tab-pane');
 
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
 
            tabs.forEach(t => t.classList.remove('w--current'));
            panes.forEach(p => p.classList.remove('w--tab-active'));
 
            tab.classList.add('w--current');
            panes[index].classList.add('w--tab-active');
 
            const dropdownHeading = document.querySelector('.tab-dropdown .dropdown-heading');
            if (dropdownHeading) {
                dropdownHeading.textContent = tab.textContent.trim();
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () { 
    const tabs = document.querySelectorAll('.standard-tab-link1');
    const panes = document.querySelectorAll('.standard-tab-pane1');
 
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
 
            tabs.forEach(t => t.classList.remove('w--current'));
            panes.forEach(p => p.classList.remove('w--tab-active'));
 
            tab.classList.add('w--current');
            panes[index].classList.add('w--tab-active');
 
            const dropdownHeading = document.querySelector('.tab-dropdown1 .dropdown-heading1');
            if (dropdownHeading) {
                dropdownHeading.textContent = tab.textContent.trim();
            }
        });
    });
});

// document.addEventListener('DOMContentLoaded', function () { 
//     const tabLinks = document.querySelectorAll('.specs-tab-link');
//     const tabPanes = document.querySelectorAll('.specs-tab-pane');
//     const dropdownMenu = document.querySelector('.specs-tabs-menu');
 
//     tabLinks.forEach((tab, index) => {
//         tab.addEventListener('click', function (event) {
//             event.preventDefault();  
 
//             tabLinks.forEach(link => link.classList.remove('w--current'));
//             tabPanes.forEach(pane => pane.classList.remove('w--tab-active'));
 
//             tab.classList.add('w--current');
//             tabPanes[index].classList.add('w--tab-active');
 
//             if (dropdownMenu) {
//                 dropdownMenu.style.display = 'none';
//             }
//         });
//     });
 
//     // const dropdownToggle = document.querySelector('.dropdown-heading');
//     // if (dropdownToggle) {
//     //     dropdownToggle.addEventListener('click', function () {
//     //         const isVisible = dropdownMenu.style.display === 'block';
//     //         dropdownMenu.style.display = isVisible ? 'none' : 'block';
//     //     });
//     // }
// });


document.addEventListener('DOMContentLoaded', function () {
    // Select all tab links and tab panes
    const tabLinks = document.querySelectorAll('.specs-tab-link');
    const tabPanes = document.querySelectorAll('.specs-tab-pane');
    const dropdownMenu = document.querySelector('.specs-tabs-menu');

    // Add click event listener to each tab link
    tabLinks.forEach((tab, index) => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();  
 
            tabLinks.forEach(link => link.classList.remove('w--current'));
            tabPanes.forEach(pane => pane.classList.remove('w--tab-active'));
 
            tab.classList.add('w--current');
            tabPanes[index].classList.add('w--tab-active');
 
            // Only hide the dropdown on small screens
            if (window.innerWidth <= 478 && dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });
    });

    // Toggle dropdown visibility (if dropdown functionality exists)
    const dropdownToggle = document.querySelector('.dropdown-heading');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function () {
            const isVisible = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
        });
    }
});
