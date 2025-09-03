export const products = [
  {
    id: 'gym',
    title: 'Gym ERP',
    subtitle: 'Drive Your Fitness Business Forward',
    description:
      'ระบบ ERP สำหรับฟิตเนส และธุรกิจสุขภาพโดยเฉพาะ ช่วยบริหารสมาชิก คอร์ส และกิจกรรมได้อย่างลงตัว',
    features: [
      'ระบบสมาชิก & คอร์สเรียน',
      'ระบบจองคลาส / ห้องฝึก',
      'ระบบชำระเงิน และ Subscription',
      'Dashboard รายงานยอดขายและสมาชิก',
    ],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'lime',
    icon: 'DumbbellIcon',
  },
  {
    id: 'pos',
    title: 'POS System',
    subtitle: 'The Heart of Retail Operations',
    description:
      'ระบบ POS ที่ช่วยให้ร้านค้าทุกขนาดจัดการยอดขายได้อย่างแม่นยำและง่ายดาย รองรับทั้งหน้าร้านจริงและออนไลน์ พร้อมฟีเจอร์ครบจบในระบบเดียว',
    features: [
      'ระบบขายหน้าร้านแบบ Real-time',
      'รองรับหลายช่องทาง (Omnichannel)',
      'จัดการสต็อกอัตโนมัติ',
      'สรุปรายงานแบบ Insightful',
    ],
    image:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'cyan',
    icon: 'MonitorIcon',
  },
  {
    id: 'wms',
    title: 'Smart WMS',
    subtitle: 'Optimize Your Warehouse Flow',
    description:
      'จัดการคลังสินค้าอย่างมีประสิทธิภาพด้วยระบบ WMS อัจฉริยะ ช่วยลดต้นทุน เพิ่มความแม่นยำ และส่งสินค้าได้ทันเวลา',
    features: [
      'ตรวจสอบสต็อก Real-time',
      'รองรับ Multi-warehouse',
      'ระบบ Tracking และ Barcode',
      'วิเคราะห์ต้นทุนการจัดเก็บสินค้า',
    ],
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'blue',
    icon: 'PackageIcon',
  },
  {
    id: 'laundry',
    title: 'Laundry Factory',
    subtitle: 'Industrial-Grade Automation',
    description:
      'ระบบบริหารโรงซักที่พัฒนาสำหรับอุตสาหกรรมซักรีดโดยเฉพาะ รองรับตั้งแต่รับงาน จ่ายงาน จนถึงจัดส่งอัตโนมัติ',
    features: [
      'ระบบ Tracking ผ้าทุกชิ้น',
      'บันทึกสูตรการซัก / การอบ',
      'ระบบแจ้งเตือนสถานะงาน',
      'วิเคราะห์ต้นทุนและกำไร',
    ],
    image:
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'magenta',
    icon: 'ShirtIcon',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Suite',
    subtitle: 'Scale Your Online Business',
    description:
      'ระบบ E-Commerce ครบวงจร สำหรับร้านค้าออนไลน์ยุคใหม่ เชื่อมต่อการขายทุกช่องทางได้ง่าย และขยายกิจการได้ไม่จำกัด',
    features: [
      'ระบบร้านค้าออนไลน์สำเร็จรูป',
      'เชื่อมต่อ Marketplace & Social Commerce',
      'ระบบ Payment Gateway',
      'ระบบส่งเสริมการขาย & Loyalty',
    ],
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'cyan',
    icon: 'ShoppingCartIcon',
  },
  {
    id: 'tms',
    title: 'Transportation Management',
    subtitle: 'Deliver Smarter',
    description:
      'บริหารการขนส่งด้วยระบบ TMS อัจฉริยะ ช่วยวางแผนเส้นทาง จัดการคนขับ และติดตามสถานะขนส่งได้แบบ Real-time',
    features: [
      'วางแผนเส้นทางอัตโนมัติ',
      'ระบบติดตาม GPS',
      'ระบบแจ้งเตือนลูกค้า',
      'วิเคราะห์ต้นทุนขนส่ง',
    ],
    image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'lime',
    icon: 'TruckIcon',
  },
  {
    id: 'booking',
    title: 'Booking System',
    subtitle: 'Seamless Reservation Experiences',
    description:
      'ระบบจองออนไลน์ที่ออกแบบเพื่อธุรกิจบริการทุกรูปแบบ ให้ลูกค้าจองง่าย เจ้าของจัดการสะดวก ครบทุกฟีเจอร์สำคัญ',
    features: [
      'ระบบจองออนไลน์แบบ Self-service',
      'แจ้งเตือนอัตโนมัติผ่าน SMS/Email',
      'ระบบชำระเงินล่วงหน้า',
      'ปฏิทินการจองแบบ Drag & Drop',
    ],
    image:
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'blue',
    icon: 'CalendarIcon',
  },
  {
    id: 'loyalty',
    title: 'Loyalty Program',
    subtitle: 'Engage & Retain Customers',
    description:
      'ระบบสะสมแต้มและสิทธิประโยชน์สำหรับธุรกิจ ช่วยดึงดูดลูกค้าใหม่ และเพิ่มความภักดีในระยะยาว',
    features: [
      'ระบบสะสมแต้มทุกการซื้อ',
      'ระบบแลกรางวัลแบบ Customizable',
      'วิเคราะห์พฤติกรรมลูกค้า',
      'เชื่อมต่อ POS & E-Commerce',
    ],
    image:
      'https://images.unsplash.com/photo-1556741533-411cf82e4e2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'amber',
    icon: 'AwardIcon',
  },
  {
    id: 'asset',
    title: 'Fixed Asset Management',
    subtitle: 'Track & Maximize Assets',
    description:
      'ระบบบริหารทรัพย์สินถาวร ช่วยติดตามสถานะทรัพย์สิน ลดความเสี่ยง และบริหารต้นทุนได้มีประสิทธิภาพ',
    features: [
      'ลงทะเบียนทรัพย์สินทุกประเภท',
      'ระบบตรวจสอบสถานะและการเคลื่อนย้าย',
      'คำนวณค่าเสื่อมราคาอัตโนมัติ',
      'ระบบแจ้งเตือนบำรุงรักษา',
    ],
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'magenta',
    icon: 'BuildingIcon',
  },
  {
    id: 'hrm',
    title: 'HRM System',
    subtitle: 'Empower Your Workforce',
    description:
      'ระบบบริหารงานบุคคลแบบครบวงจร ช่วยจัดการพนักงาน ตั้งแต่สรรหาจนถึงพัฒนาองค์กร',
    features: [
      'ระบบ Time Attendance & Payroll',
      'ระบบสวัสดิการและประเมินผล',
      'ระบบพัฒนาศักยภาพพนักงาน',
      'วิเคราะห์ข้อมูลบุคคลากรแบบเชิงลึก',
    ],
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'cyan',
    icon: 'MonitorIcon',
  },
  {
    id: 'tourism',
    title: 'Tourism Solution',
    subtitle: 'Empowering The Travel Industry',
    description:
      'แพลตฟอร์มที่ออกแบบมาเพื่อธุรกิจท่องเที่ยวโดยเฉพาะ ช่วยจัดการทริป ทัวร์ และการจองได้ครบในที่เดียว',
    features: [
      'ระบบจองทัวร์และกิจกรรม',
      'ระบบจัดการไกด์และผู้ดูแลทริป',
      'ระบบขาย Package + บริการเสริม',
      'ระบบรีวิวและสะสมคะแนนจากลูกค้า',
    ],
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    color: 'blue',
    icon: 'PlaneIcon',
  },
]