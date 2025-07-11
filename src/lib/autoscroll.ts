import { useRef, useEffect, useState, MutableRefObject } from "react";

// Custom Hook สำหรับจัดการการเลื่อนหน้าจออัตโนมัติ (Auto-Scroll)
export const useAutoScroll = (
  sectionRefs: MutableRefObject<HTMLDivElement | null>[] // รับค่าอ้างอิง (ref) ของแต่ละส่วน (section) ที่ต้องการให้เลื่อนไปหา
) => {
  // สถานะเพื่อตรวจสอบว่าผู้ใช้กำลังเลื่อนอยู่หรือไม่
  const [isScrolling, setIsScrolling] = useState(false);
  // useRef สำหรับเก็บ ID ของ setTimeout เพื่อใช้ในการยกเลิก (debounce)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect สำหรับจัดการ Event Listener การเลื่อนหน้าจอ
  useEffect(() => {
    // ฟังก์ชัน handleScroll: ตรวจจับการเลื่อนและตั้งเวลา debounce
    const handleScroll = () => {
      // ถ้ามี setTimeout เก่าค้างอยู่ ให้ยกเลิกไปก่อน
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      setIsScrolling(true); // ตั้งค่าว่าผู้ใช้กำลังเลื่อนอยู่

      // ตั้งเวลา debounce: ถ้าผู้ใช้หยุดเลื่อนเป็นเวลา 500ms ให้เรียก handleScrollStop
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        handleScrollStop();
      }, 600); // ระยะเวลา debounce (500ms)
    };

    // ฟังก์ชัน handleScrollStop: จัดการ Logic การเลื่อนอัตโนมัติเมื่อผู้ใช้หยุดเลื่อน
    const handleScrollStop = () => {
      const currentScroll = window.scrollY; // ตำแหน่งการเลื่อนปัจจุบัน
      const viewportHeight = window.innerHeight; // ความสูงของหน้าจอที่มองเห็น

      let targetScrollPosition = currentScroll; // ตำแหน่งเป้าหมายที่จะเลื่อนไป

      // วนลูปผ่านแต่ละส่วน (section) ที่กำหนดไว้
      for (let i = 0; i < sectionRefs.length; i++) {
        const ref = sectionRefs[i];
        if (ref.current) {
          const sectionTop = ref.current.offsetTop; // ตำแหน่งด้านบนของ section
          const sectionHeight = ref.current.offsetHeight; // ความสูงของ section
          const sectionBottom = sectionTop + sectionHeight; // ตำแหน่งด้านล่างของ section

          // ตรวจสอบว่าตำแหน่งการเลื่อนปัจจุบันอยู่ในช่วงของ section นี้หรือไม่ (โดยประมาณกลางหน้าจอ)
          if (
            currentScroll >= sectionTop - viewportHeight * 0.5 &&
            currentScroll < sectionBottom - viewportHeight * 0.5
          ) {
            const nextSectionIndex = i + 1; // Index ของ section ถัดไป
            const prevSectionIndex = i - 1; // Index ของ section ก่อนหน้า

            // 1. Logic สำหรับการเลื่อนไป section ก่อนหน้า (ถ้าเลื่อนขึ้นเล็กน้อย)
            if (
              prevSectionIndex >= 0 &&
              sectionRefs[prevSectionIndex].current
            ) {
              // ตรวจสอบว่าเลื่อนขึ้นมาเหนือส่วนปัจจุบันเล็กน้อย (น้อยกว่า 10% ของความสูงหน้าจอ)
              if (
                currentScroll < sectionTop &&
                sectionTop - currentScroll < viewportHeight * 0.1
              ) {
                targetScrollPosition =
                  sectionRefs[prevSectionIndex].current!.offsetTop; // กำหนดเป้าหมายเป็นด้านบนของ section ก่อนหน้า
                break; // พบเป้าหมายแล้ว ออกจากลูป
              }
            }

            // 2. Logic สำหรับการเลื่อนไป section ถัดไป (ถ้าเลื่อนลงไปในส่วนนั้น)
            if (
              nextSectionIndex < sectionRefs.length &&
              sectionRefs[nextSectionIndex].current
            ) {
              const nextSectionTop =
                sectionRefs[nextSectionIndex].current!.offsetTop; // ตำแหน่งด้านบนของ section ถัดไป
              const nextSectionVisibleHeight =
                currentScroll + viewportHeight - nextSectionTop; // ความสูงของ section ถัดไปที่มองเห็น
              const nextSectionPercentage =
                (nextSectionVisibleHeight / viewportHeight) * 100; // เปอร์เซ็นต์ของ section ถัดไปที่มองเห็น

              // ถ้า section ถัดไปมองเห็นเกิน 3% ให้เลื่อนไปที่ section ถัดไป
              if (nextSectionPercentage > 15) {
                targetScrollPosition = nextSectionTop; // กำหนดเป้าหมายเป็นด้านบนของ section ถัดไป
                break; // พบเป้าหมายแล้ว ออกจากลูป
              }
            }

            // 3. ค่าเริ่มต้น: เลื่อนไปที่ section ปัจจุบัน (ถ้าไม่ได้เลื่อนไปก่อนหน้าหรือถัดไป)
            targetScrollPosition = sectionTop; // กำหนดเป้าหมายเป็นด้านบนของ section ปัจจุบัน
            break; // พบเป้าหมายแล้ว ออกจากลูป
          }
        }
      }

      // เลื่อนหน้าจอจริงก็ต่อเมื่อตำแหน่งเป้าหมายแตกต่างจากตำแหน่งปัจจุบันอย่างมีนัยสำคัญ
      if (Math.abs(currentScroll - targetScrollPosition) > 5) {
        window.scrollTo({
          top: targetScrollPosition, // ตำแหน่ง Y ที่จะเลื่อนไป
          behavior: "smooth", // เลื่อนแบบนุ่มนวล
        });
      }
    };

    // เพิ่ม Event Listener สำหรับการเลื่อนหน้าจอ
    window.addEventListener("scroll", handleScroll);

    // Cleanup function: ลบ Event Listener และยกเลิก setTimeout เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sectionRefs]); // Dependency array: จะรัน useEffect ใหม่เมื่อ sectionRefs เปลี่ยนแปลง
};
