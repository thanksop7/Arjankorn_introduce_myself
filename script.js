document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById('intro-screen');
    const startBtn = document.getElementById('start-btn');
    const mainHomepage = document.getElementById('main-homepage');
    const emojiBg = document.getElementById('emoji-background');
    const pageOverlay = document.getElementById('page-overlay');
    const cards = document.querySelectorAll('.card');

    let emojiInterval = null;

    // 1. กดเข้าสู่หน้าหลักจากฉากเปิด
    startBtn.addEventListener('click', () => {
        introScreen.classList.add('fade-out');
        mainHomepage.classList.remove('hidden');
    });

    // ฟังก์ชันสร้างอีโมจิสุ่มตำแหน่ง
    function createFloatingEmoji(emojiList) {
        const emojiEl = document.createElement('div');
        emojiEl.classList.add('floating-emoji');
        
        // สุ่มเลือกอีโมจิจากลิสต์ของการ์ดใบนั้นๆ
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        emojiEl.innerText = randomEmoji;

        // สุ่มตำแหน่งแกน X (ซ้ายไปขวาของจอ) และขนาด
        emojiEl.style.left = Math.random() * 100 + "vw";
        emojiEl.style.fontSize = (Math.random() * 1.5 + 1.5) + "rem"; // สุ่มขนาด 1.5rem - 3rem
        
        emojiBg.appendChild(emojiEl);

        // พอลอยจบแอนิเมชัน ให้ลบ Element ทิ้งเพื่อไม่ให้หนักเครื่อง
        emojiEl.addEventListener('animationend', () => {
            emojiEl.remove();
        });
    }

    // 2. ตรวจจับการเลื่อนเมาส์ชี้การ์ด เพื่อปล่อยอีโมจิ
    cards.forEach(card => {
        // ดึงรายการอีโมจิที่เขียนไว้ใน HTML attribute 'data-emojis' มาทำเป็น Array
        const emojiList = card.getAttribute('data-emojis').split(',');

        card.addEventListener('mouseenter', () => {
            // ปล่อยอีโมจิเรื่อยๆ ทุกๆ 150 มิลลิวินาที เมื่อเมาส์ชี้การ์ด
            emojiInterval = setInterval(() => {
                createFloatingEmoji(emojiList);
            }, 150);
        });

        card.addEventListener('mouseleave', () => {
            // หยุดปล่อยอีโมจิเมื่อเอาเมาส์ออก
            clearInterval(emojiInterval);
        });

        // 3. ระบบคลิกเลือกการ์ด + เอฟเฟกต์เฟดเปลี่ยนหน้าโปรไฟล์
        card.addEventListener('click', () => {
            const profileUrl = card.getAttribute('data-profile');
            
            // ปลดบล็อกแอนิเมชันปล่อยอีโมจิทันทีเมื่อกด
            clearInterval(emojiInterval);

            // สั่งให้ฉากหลังค่อยๆ เฟดดำสนิท
            pageOverlay.classList.add('fade-active');

            // รอหน้าจอเฟดดำสมบูรณ์ (800 มิลลิวินาที ตามที่ตั้งใน CSS) แล้วจึงย้ายหน้าเว็บ
            setTimeout(() => {
                window.location.href = profileUrl;
            }, 800);
        });
    });
});