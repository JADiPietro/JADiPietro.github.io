document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('toggled');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check local storage for preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            updateIcon(isDark);
        });
    }

    function updateIcon(isDark) {
        if (!darkModeToggle) return;
        darkModeToggle.innerHTML = isDark ? '&#9728;' : '&#9790;';
        darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    // --- Hero Typing Animation ---
    const heroTextElement = document.getElementById('hero-typing-text');
    if (heroTextElement) {
        const textToType = "Hi, I'm Jackie";
        heroTextElement.textContent = "";
        heroTextElement.classList.add('typing-cursor');

        let charIndex = 0;
        const typeSpeed = 100;

        function type() {
            if (charIndex < textToType.length) {
                heroTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(() => {
                    heroTextElement.classList.remove('typing-cursor');
                }, 3000);
            }
        }
        setTimeout(type, 500);
    }

    // --- Image Comparison Slider (MCL) ---
    initComparisons();

    function initComparisons() {
        const slider = document.querySelector(".img-comp-slider");
        const overlay = document.querySelector(".img-comp-overlay");
        const overlayImg = overlay ? overlay.querySelector("img") : null;
        const container = document.querySelector(".img-comp-container");

        if (!slider || !overlay || !overlayImg || !container) return;

        let isDragging = false;

        function syncImageWidth() {
            const width = container.getBoundingClientRect().width;
            overlayImg.style.width = width + "px";
        }

        syncImageWidth();
        window.addEventListener('load', syncImageWidth);
        window.addEventListener('resize', syncImageWidth);

        // Mouse events
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);

        // Touch events
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            isDragging = true;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            isDragging = false;
            window.removeEventListener("mousemove", slideMove);
            window.removeEventListener("touchmove", slideMove);
        }

        function slideMove(e) {
            if (!isDragging) return;
            const pos = getCursorPos(e);
            let x = pos;
            if (x < 0) x = 0;
            if (x > container.offsetWidth) x = container.offsetWidth;
            slide(x);
        }

        function getCursorPos(e) {
            const rect = container.getBoundingClientRect();
            let x = 0;
            e = e || window.event;
            if (e.changedTouches) {
                x = e.changedTouches[0].pageX - rect.left - window.pageXOffset;
            } else {
                x = e.pageX - rect.left - window.pageXOffset;
            }
            return x;
        }

        function slide(x) {
            overlay.style.width = x + "px";
            slider.style.left = x + "px";
        }
    }

    // --- Project Description Toggle ---
    const mclToggle = document.getElementById('mcl-toggle');
    const projectDescription = document.querySelector('.project-description');

    if (mclToggle && projectDescription) {
        mclToggle.addEventListener('click', () => {
            const isExpanded = projectDescription.classList.toggle('expanded');
            mclToggle.textContent = isExpanded ? 'Read Less' : 'Read More';
        });
    }

    // --- Inline Parks Gallery ---
    initInlineGallery();

    function initInlineGallery() {
        const parkCards = document.querySelectorAll('.park-card');
        if (parkCards.length === 0) return;

        // Modal Elements
        const modal = document.getElementById('gallery-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalTrack = document.getElementById('modal-track');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalPrevBtn = modal.querySelector('.carousel-button.prev');
        const modalNextBtn = modal.querySelector('.carousel-button.next');

        let currentParkKey = null;
        let currentModalIndex = 0;

        // Park Data (Corrected Mapping)
        const parkData = {
            acadia: {
                name: "Acadia National Park",
                images: [
                    "08DAF0FB-3B66-4C5E-AE61-68C357A93C0E_4_5005_c.jpeg",
                    "08F8D45C-A55A-436B-9EE2-B813009AA96C_4_5005_c.jpeg",
                    "9C2AF891-46FD-4958-B1C1-A59DC76B0E40_4_5005_c.jpeg",
                    "AB258A40-C0B6-4577-9543-0AA6090199BD_4_5005_c.jpeg",
                    "CF66F050-05D9-4A9F-B27E-840A915EED79_4_5005_c.jpeg",
                    "E5230592-C2A8-4BF2-B430-57685BA17145_4_5005_c.jpeg",
                    "ECA9DEAA-C3B4-432D-9F46-4C377DA84FC4_4_5005_c.jpeg",
                    "F465122F-D199-4E3C-82AF-7AC584C86EC3_4_5005_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Acadia/"
            },
            arches: {
                name: "Arches National Park",
                images: [
                    "11194BE3-945C-4069-990F-21C8D39B43DF_1_105_c.jpeg",
                    "47309261-C1A4-4651-8E75-EE273A220D4E_1_105_c.jpeg",
                    "4B265E1A-1AC1-4DEE-B35A-644A2FB76CE8_1_105_c.jpeg",
                    "50BCBADC-351B-4AA5-BCD0-95ED21ADA60A_1_105_c.jpeg",
                    "73CE527C-7D0A-4184-8D56-642782F95D95_4_5005_c.jpeg",
                    "7BB0E0A7-592C-4244-A6EC-8718953FAA3D_1_105_c.jpeg",
                    "7DE400C1-2D2B-42BE-9B42-1E470BF4243A_1_105_c.jpeg",
                    "90CAE91A-3733-4AD2-84FF-B08DD6863057_1_105_c.jpeg",
                    "BAE25324-8B84-446F-8A66-E4154364A643_1_105_c.jpeg",
                    "C94EE051-41E4-4171-A830-ED92BDFF5A0B_4_5005_c.jpeg",
                    "D6F34DF0-5B1E-4920-849D-230F07DB289D_4_5005_c.jpeg",
                    "FCDDA93E-A61C-4DC4-99B7-C18BA9493A9B_1_105_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Arches/"
            },
            bryce: {
                name: "Bryce Canyon National Park",
                images: [
                    "20EC9012-DF50-433A-892C-7B3C288444BC_1_105_c.jpeg",
                    "4794AEF1-C9E2-4815-89E9-59B1D6392B50_4_5005_c.jpeg",
                    "57EC13A1-07C1-4E10-AE2A-F681E3A5C6D1_1_105_c.jpeg",
                    "5916DED2-BDCC-4BAF-863B-5400A3F245F5_1_105_c.jpeg",
                    "6EBE341B-71D2-4746-8344-635A8473CAF0_1_105_c.jpeg",
                    "72205E04-DBBF-4809-9478-FE9521497D82_4_5005_c.jpeg",
                    "83B14664-E1B9-4803-A9E7-6BB39E808C1C_4_5005_c.jpeg",
                    "853CCE94-8221-4ECB-86F3-A85051A485BB_1_105_c.jpeg",
                    "A2F7CFB6-3965-49FC-8007-FF0250FE293F_1_105_c.jpeg",
                    "A59409B1-934B-4770-8872-0AB2E415AB1C_1_105_c.jpeg",
                    "A91C4618-2285-4C1C-B243-A9944F8B6E02_4_5005_c.jpeg",
                    "CD81BE0F-0768-4322-A788-02E3FA8062FB_4_5005_c.jpeg",
                    "EBC706D4-7BC6-40F3-924E-AFFB4D979722_1_105_c.jpeg",
                    "F0B929E7-6FC3-4459-8A7D-13067FE233E3_4_5005_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Bryce%20Canyon/"
            },
            canyon: {
                name: "Canyon Lands National Park",
                images: [
                    "1CDBC2C6-124C-449B-93CF-6AB05713910B_4_5005_c.jpeg",
                    "2939B688-C225-4C65-9E90-19675B0FE498_1_105_c.jpeg",
                    "2CD17D8A-F855-4AF7-97A5-8A705A5A3228_4_5005_c.jpeg",
                    "518622DE-57D6-425C-AAC4-FFFAEFA794BB_1_105_c.jpeg",
                    "A64AA31E-25AA-458D-A21C-45541CF8E48D_4_5005_c.jpeg",
                    "B6B1E526-9E48-4A23-A3C4-EDF57CC0DB82_4_5005_c.jpeg",
                    "C75E50A2-723F-419A-AB21-A214A1D0DBE0_1_105_c.jpeg",
                    "D569E143-B26A-4248-93F9-5AA60D696F94_1_105_c.jpeg",
                    "DDAB258E-523D-4300-8923-154C42BEE6C9_4_5005_c.jpeg",
                    "EF0E70D8-9BAD-4A2A-B32E-998AD6836365_4_5005_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Canyon%20Lands/"
            },
            castle: {
                name: "Castle Crags State Park",
                images: [
                    "093B95C1-4007-43F0-92DF-BEAD8DB6485C_1_105_c.jpeg",
                    "21FECC46-C7A4-4E42-9144-42CEC98E781E_1_105_c.jpeg",
                    "47C99F74-DEFC-4E2B-94E8-0E956746C6E7_1_105_c.jpeg",
                    "9CD6D6A8-7460-44E6-BC77-E3F44F0BF729_1_105_c.jpeg",
                    "B8555BBC-AF8D-4893-9D16-0C6931FB55BD_1_105_c.jpeg",
                    "C21C7427-64B1-4DD4-B7F4-D7AFCC10B2C2_1_105_c.jpeg",
                    "DA2D933B-B708-45F4-B2B3-FF015BF3C20E_1_105_c.jpeg",
                    "E995FA4B-990C-454B-8B71-771164A8C322_1_105_c.jpeg",
                    "FB223F27-D31B-42EA-83F4-F9C1EE46E8D6_1_105_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Castle%20Crags/"
            },
            lassen: {
                name: "Lassen Volcanic National Park",
                images: [
                    "076E6102-009A-41B2-8518-32A03B64588D_1_105_c.jpeg",
                    "1963ED97-FA6E-4A42-A0ED-F7EAC4A8352A_1_105_c.jpeg",
                    "39E8007F-C041-4289-86BA-CBF3A1001BF1_1_105_c.jpeg",
                    "3D0A15A2-436C-4E13-BAE4-8302984633EE_1_105_c.jpeg",
                    "3FDB545F-7460-4B14-8307-7889273E117D_1_105_c.jpeg",
                    "4E5593D5-F2D9-4AEB-BF9B-5509331069D4_1_105_c.jpeg",
                    "58087871-CB8F-4A8D-9CF8-8A29F3FCBDB2_1_105_c.jpeg",
                    "6D018E93-9249-484D-8D2A-3A8D0E3447E2_1_105_c.jpeg",
                    "7551C375-28AE-445B-8481-BAEDE909A6AC_1_105_c.jpeg",
                    "C33218B5-CAAD-4F50-A8CD-0ECC88D764B7_1_105_c.jpeg",
                    "FA79195B-A9F4-434E-ABE7-9632429DC022_1_105_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Lassen%20Volcanic/"
            },
            redwoods: {
                name: "Redwood National and State Parks",
                images: [
                    "03C03EFE-EEBD-4625-9DA6-20B4740415C4_1_105_c.jpeg",
                    "280B3C49-3DA1-406C-901C-C862EE62E983_1_105_c.jpeg",
                    "8DA2B61F-E1CF-4A2B-B3A1-4BD0CAB95831_1_105_c.jpeg",
                    "90297845-2CD6-49D0-8680-02E4FE17170A_1_105_c.jpeg",
                    "A07E9A9E-10CA-4F6C-BD9B-54BEA2E506F2_1_105_c.jpeg",
                    "CF6580A6-1DF2-4296-B6E1-ED38C33BE7ED_1_105_c.jpeg",
                    "E2B5DA00-A71F-47BB-8267-97283206C88E_1_105_c.jpeg",
                    "F59D69A8-5F1B-4AC6-B071-1762C49EC050_1_105_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Red%20Woods/"
            },
            shenandoah: {
                name: "Shenandoah National Park",
                images: [
                    "170DBEC2-0ACF-4EB5-AEE0-7D89C34F2C6E_4_5005_c.jpeg",
                    "1722D4B1-941A-4D18-8520-F5E0AD2A394B_4_5005_c.jpeg",
                    "45B038ED-B43C-4733-922C-53CCA183E236_4_5005_c.jpeg",
                    "6674D329-6809-4378-ACAD-40D8A58EFEAF_4_5005_c.jpeg",
                    "6DB7AA7F-796F-4B20-8E22-B7692F5011E5_1_105_c.jpeg",
                    "88B33DDD-C08A-4D6E-BC8B-72863AFA14D8_4_5005_c.jpeg",
                    "8DDF9B36-4772-4F1A-BB44-66AE36E7C0A8_4_5005_c.jpeg",
                    "A43046A8-F3BB-4F92-B973-8CB26A8B29D7_4_5005_c.jpeg",
                    "BEF6D21B-49C1-4C11-96F5-C327CF2DA97C_4_5005_c.jpeg",
                    "F43EF024-3F19-40A8-9647-40EF5400E25A_4_5005_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Shenandoah/"
            },
            zion: {
                name: "Zion National Park",
                images: [
                    "0C5A0090-0BD6-4F21-9AB9-538FDCC94480_1_105_c.jpeg",
                    "0D5679B3-DE22-4ED2-AE07-A7FA3E783DDA_1_105_c.jpeg",
                    "3622DF2E-05FA-4C38-A8E6-D8D2C2B5A82F_1_105_c.jpeg",
                    "386EAE5F-09BE-4752-AD9B-5DCACB8AEBFA_1_105_c.jpeg",
                    "3DBCB6A6-833C-4F8F-9230-643CC8EC8A2C_4_5005_c.jpeg",
                    "616B6751-F13E-4CE2-A32C-0C0D955F69D9_1_105_c.jpeg",
                    "61709F91-C726-4C99-BEA0-360FE5A1B36B_4_5005_c.jpeg",
                    "61BC2AC3-BE14-4460-B341-73115D5C8BB0_4_5005_c.jpeg",
                    "6D919A4F-00FF-428F-AEB3-7560867B9DB9_1_105_c.jpeg",
                    "78F1C4B5-4AAB-47F4-A185-2EB3A2C5AFD3_1_105_c.jpeg",
                    "813B88B6-25B9-4B71-811B-F25A96AA937F_1_105_c.jpeg",
                    "8D7C329A-16F9-4A75-8906-859DB6EE94F8_4_5005_c.jpeg",
                    "A07134DA-C1AD-4E78-A359-3B5F5D3ADCC1_4_5005_c.jpeg",
                    "E3A4DC01-387B-408C-92D9-4B2EA1CED130_1_105_c.jpeg",
                    "F5314723-3A3C-470D-8D2C-9A9CF865723B_1_105_c.jpeg"
                ],
                path: "National%20and%20State%20Parks/Zion/"
            }
        };

        // --- Inline Card Looping ---
        parkCards.forEach(card => {
            const parkKey = card.getAttribute('data-park');
            const park = parkData[parkKey];
            if (!park) return;

            const img = card.querySelector('img');
            const nextBtn = card.querySelector('.next');
            const prevBtn = card.querySelector('.prev');
            let currentIndex = 0;

            const updateImage = () => {
                img.src = park.path + park.images[currentIndex];
                img.alt = `${park.name} Image ${currentIndex + 1}`;
            };

            // Click Image to Open Modal
            img.addEventListener('click', () => {
                openModal(parkKey, currentIndex);
            });
            // Ensure pointer cursor
            img.style.cursor = 'pointer';

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent modal open when clicking nav
                currentIndex++;
                if (currentIndex >= park.images.length) {
                    currentIndex = 0;
                }
                updateImage();
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent modal open when clicking nav
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = park.images.length - 1;
                }
                updateImage();
            });
        });

        // --- Modal Logic ---

        function openModal(parkKey, initialIndex) {
            currentParkKey = parkKey;
            currentModalIndex = initialIndex;
            const park = parkData[parkKey];

            if (!park) return;

            modalTitle.textContent = park.name;
            modal.style.display = 'flex'; // Show modal

            updateModalImage();
        }

        function closeModal() {
            modal.style.display = 'none';
            currentParkKey = null;
        }

        function updateModalImage() {
            if (!currentParkKey) return;
            const park = parkData[currentParkKey];

            // Clear existing
            modalTrack.innerHTML = '';

            // Create list item for styling match
            const li = document.createElement('li');
            li.className = 'carousel-slide';

            const img = document.createElement('img');
            img.src = park.path + park.images[currentModalIndex];
            img.alt = `${park.name} - Full View`;

            li.appendChild(img);
            modalTrack.appendChild(li);
        }

        function nextModalImage() {
            if (!currentParkKey) return;
            const park = parkData[currentParkKey];
            currentModalIndex++;
            if (currentModalIndex >= park.images.length) {
                currentModalIndex = 0;
            }
            updateModalImage();
        }

        function prevModalImage() {
            if (!currentParkKey) return;
            const park = parkData[currentParkKey];
            currentModalIndex--;
            if (currentModalIndex < 0) {
                currentModalIndex = park.images.length - 1;
            }
            updateModalImage();
        }

        // Modal Event Listeners
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        if (modalNextBtn) {
            modalNextBtn.addEventListener('click', nextModalImage);
        }

        if (modalPrevBtn) {
            modalPrevBtn.addEventListener('click', prevModalImage);
        }

        // Close when clicking outside content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    prevModalImage();
                } else if (e.key === 'ArrowRight') {
                    nextModalImage();
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        });
    }
});
