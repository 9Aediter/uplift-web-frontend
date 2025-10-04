"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

// Hook ที่ใช้ useSearchParams - ต้อง wrap ด้วย Suspense เมื่อใช้งาน
export function useErrorHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get("error")

    if (error) {
      switch (error.toLowerCase()) {
        case "forbidden":
          toast.error("เข้าถึงระบบไม่ได้", {
            description: "คุณไม่มีสิทธิ์เข้าใช้งานส่วนนี้ กรุณาติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์การเข้าใช้งาน",
            duration: 6000,
          })
          break
        case "unauthorized":
          toast.error("กรุณาเข้าสู่ระบบ", {
            description: "คุณต้องเข้าสู่ระบบก่อนเพื่อเข้าใช้งานส่วนนี้",
            duration: 4000,
          })
          break
        case "access_denied":
          toast.error("การเข้าถึงถูกปฏิเสธ", {
            description: "ไม่สามารถเข้าใช้งานได้ในขณะนี้ กรุณาลองใหม่อีกครั้งหรือติดต่อฝ่ายสนับสนุน",
            duration: 5000,
          })
          break
        case "session_expired":
          toast.error("เซสชันหมดอายุ", {
            description: "กรุณาเข้าสู่ระบบใหม่เพื่อดำเนินการต่อ",
            duration: 4000,
          })
          break
        case "invalid_credentials":
          toast.error("ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง", {
            description: "กรุณาตรวจสอบอีเมลและรหัสผ่านแล้วลองใหม่อีกครั้ง",
            duration: 4000,
          })
          break
        default:
          toast.error("เกิดข้อผิดพลาด", {
            description: "พบปัญหาในการใช้งานระบบ กรุณาลองใหม่อีกครั้งหรือติดต่อฝ่ายสนับสนุน",
            duration: 4000,
          })
      }

      // Clean URL by removing error parameter
      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      window.history.replaceState({}, "", url)
    }
  }, [searchParams])
}