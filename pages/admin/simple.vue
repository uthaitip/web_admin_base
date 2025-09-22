<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section with better styling -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <BaseIcon name="chart-bar" size="lg" class="text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">รายงานการใช้ไฟฟ้า</h1>
            <p class="text-gray-600 mt-1">ระบบจัดการและรายงานการใช้พลังงาน</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <!-- Enhanced Export Options -->
          <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BaseIcon name="cog-6-tooth" size="sm" class="text-white" />
              </div>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" v-model="showAllInPDF" class="checkbox checkbox-sm checkbox-primary" />
                <span class="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                  รวมข้อมูลทั้งหมดใน PDF
                </span>
              </label>
            </div>
          </div>
          
          <!-- Enhanced Export Button -->
          <BaseButton 
            @click="downloadPDF" 
            color="primary" 
            size="lg"
            :loading="isExporting"
            :disabled="isExporting"
            class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none group"
          >
            <!-- Button background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            <div class="relative flex items-center gap-3">
              <div class="w-5 h-5 flex items-center justify-center">
                <BaseIcon 
                  :name="isExporting ? 'arrow-path' : 'document-arrow-down'" 
                  size="sm" 
                  :class="isExporting ? 'animate-spin' : 'group-hover:animate-bounce'" 
                /> 
              </div>
              <span class="font-bold tracking-wide">
                {{ isExporting ? 'กำลังสร้าง PDF...' : 'ส่งออก PDF' }}
              </span>
            </div>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Report Content with better styling -->
    <div id="report-content" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Official Government Document Header -->
      <div class="bg-white border-b-2 border-gray-800 p-8">
        <div class="text-center space-y-4">
          <!-- Government Header -->
          <div class="border-b border-gray-300 pb-2">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">กรมพัฒนาพลังงานทดแทนและอนุรักษ์พลังงาน</h1>
            <h2 class="text-lg font-semibold text-gray-700">กระทรวงพลังงาน</h2>
          </div>
          
          <!-- Document Title -->
          <div class="py-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">รายงานการใช้ไฟฟ้ารายวัน</h3>
            <p class="text-lg text-gray-700">ประจำเดือน {{ currentMonth }} พ.ศ. {{ currentYear }}</p>
          </div>
          
          <!-- Document Info -->
          <div class="text-right text-sm text-gray-600">
            <p>วันที่จัดทำ: {{ formatDate(new Date()) }}</p>
            <p>เลขที่เอกสาร: DOC-{{ new Date().getFullYear() }}-{{ String(new Date().getMonth() + 1).padStart(2, '0') }}-{{ String(new Date().getDate()).padStart(2, '0') }}</p>
          </div>
        </div>
      </div>
      
      <!-- Report Body -->
      <div class="p-8">


        <!-- Official Government Table -->
        <div class="mb-8">
          <!-- Formal section header -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
              ตารางแสดงข้อมูลการใช้ไฟฟ้ารายวัน
            </h2>
            <p class="text-sm text-gray-700 mb-4">
              ข้อมูลการใช้ไฟฟ้าและค่าใช้จ่ายประจำวัน เรียงตามวันที่ (รวม {{ dailyUsage.length }} วัน)
            </p>
          </div>

          <!-- Data validation alert -->
          <div v-if="dailyUsage.length === 0" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div class="flex items-center">
              <BaseIcon name="exclamation-triangle" size="sm" class="text-red-600 mr-2" />
              <span class="text-red-800 font-medium">ไม่พบข้อมูลการใช้ไฟฟ้า</span>
            </div>
          </div>

          <div v-else-if="dailyUsage.length < 30" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div class="flex items-center">
              <BaseIcon name="exclamation-triangle" size="sm" class="text-yellow-600 mr-2" />
              <span class="text-yellow-800 font-medium">
                ข้อมูลไม่ครบ: มีข้อมูลเพียง {{ dailyUsage.length }} วัน จากทั้งหมด 30 วัน
              </span>
            </div>
          </div>

          <!-- Official table -->
          <div class="border-2 border-gray-800">
            <table class="w-full pdf-table border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-800">
                    ลำดับ
                  </th>
                  <th class="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-800">
                    วันที่
                  </th>
                  <th class="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-800">
                    การใช้ไฟฟ้า<br/>(กิโลวัตต์-ชั่วโมง)
                  </th>
                  <th class="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-800">
                    ค่าไฟฟ้า<br/>(บาท)
                  </th>
                  <th class="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-800">
                    หมายเหตุ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(day, index) in (showAllInPDF ? dailyUsage : paginatedDailyUsage)" 
                    :key="day.date.toISOString()"
                    class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800">
                    {{ showAllInPDF ? index + 1 : ((currentPage - 1) * itemsPerPage) + index + 1 }}
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800">
                    {{ formatDateThai(day.date) }}
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800 font-mono">
                    {{ day.usage.toLocaleString() }}
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800 font-mono">
                    {{ day.cost.toLocaleString() }}
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800">
                    {{ getUsageStatusThai(day.usage) }}
                  </td>
                </tr>
              </tbody>
              <!-- Summary row -->
              <tfoot>
                <tr class="bg-gray-100 font-bold">
                  <td colspan="2" class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800">
                    {{ showAllInPDF ? 'รวมทั้งสิ้น' : `รวมหน้านี้ (${currentPageData.length} รายการ)` }}
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800 font-mono">
                    {{ showAllInPDF ? totalUsage : currentPageUsage }} กิโลวัตต์-ชั่วโมง
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800 font-mono">
                    {{ showAllInPDF ? totalCost.toLocaleString() : currentPageCost.toLocaleString() }} บาท
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-900 border border-gray-800">
                    {{ showAllInPDF ? '-' : `หน้า ${currentPage}/${totalPages}` }}
                  </td>
                </tr>
                <tr v-if="!showAllInPDF && totalPages > 1" class="bg-gray-50 font-semibold">
                  <td colspan="2" class="px-4 py-3 text-center text-sm text-gray-700 border border-gray-800">
                    รวมทั้งสิ้น ({{ dailyUsage.length }} รายการ)
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-700 border border-gray-800 font-mono">
                    {{ totalUsage }} กิโลวัตต์-ชั่วโมง
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-700 border border-gray-800 font-mono">
                    {{ totalCost.toLocaleString() }} บาท
                  </td>
                  <td class="px-4 py-3 text-center text-sm text-gray-700 border border-gray-800">
                    -
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <!-- Pagination Controls (only show when not exporting all data) -->
          <div v-if="!showAllInPDF && totalPages > 1" class="mt-6 flex justify-center">
            <div class="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <button 
                    @click="currentPage = currentPage - 1" 
                    :disabled="currentPage === 1"
                    class="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    ← ก่อนหน้า
                  </button>
                  
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium">หน้า</span>
                    <select 
                      v-model="currentPage" 
                      class="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option v-for="page in totalPages" :key="page" :value="page">
                        {{ page }}
                      </option>
                    </select>
                    <span class="text-sm font-medium">จาก {{ totalPages }}</span>
                  </div>
                  
                  <button 
                    @click="currentPage = currentPage + 1" 
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    ถัดไป →
                  </button>
                </div>
                
                <div class="text-sm text-gray-600">
                  แสดง {{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, dailyUsage.length) }} 
                  จาก {{ dailyUsage.length }} รายการ
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div> <!-- End report body p-8 -->


      <!-- Official Government Footer -->
      <div class="mt-12 border-t-2 border-gray-800 pt-8">
        <!-- Summary Section -->
        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-900 mb-4">สรุปผลการรายงาน</h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-700 mb-2"><span class="font-semibold">การใช้ไฟฟ้ารวม:</span> {{ totalUsage }} กิโลวัตต์-ชั่วโมง</p>
              <p class="text-sm text-gray-700 mb-2"><span class="font-semibold">ค่าไฟฟ้ารวม:</span> {{ totalCost.toLocaleString() }} บาท</p>
              <p class="text-sm text-gray-700"><span class="font-semibold">จำนวนวันที่บันทึก:</span> {{ dailyUsage.length }} วัน</p>
            </div>
            <div>
              <p class="text-sm text-gray-700 mb-2"><span class="font-semibold">การใช้ไฟฟ้าเฉลี่ยต่อวัน:</span> {{ averageDaily }} กิโลวัตต์-ชั่วโมง</p>
              <p class="text-sm text-gray-700 mb-2"><span class="font-semibold">ค่าไฟฟ้าเฉลี่ยต่อวัน:</span> {{ (totalCost / dailyUsage.length).toLocaleString() }} บาท</p>
            </div>
          </div>
        </div>

        <!-- Signature Section -->
        <div class="grid grid-cols-2 gap-12 mb-8">
          <div class="text-center">
            <div class="border-b border-gray-400 mb-2 pb-12"></div>
            <p class="text-sm font-semibold text-gray-900">ผู้จัดทำรายงาน</p>
            <p class="text-xs text-gray-600">ตำแหนง่ เจ้าหน้าที่วิเคราะห์ข้อมูล</p>
          </div>
          <div class="text-center">
            <div class="border-b border-gray-400 mb-2 pb-12"></div>
            <p class="text-sm font-semibold text-gray-900">ผู้อนุมัติรายงาน</p>
            <p class="text-xs text-gray-600">ตำแหนง่ ผู้อำนวยการกอง</p>
          </div>
        </div>

        <!-- Document Footer -->
        <div class="text-center text-xs text-gray-600 border-t border-gray-300 pt-4">
          <p class="mb-1">รายงานฉบับนี้จัดทำขึ้นโดยระบบสารสนเทศการจัดการพลังงาน</p>
          <p class="mb-1">กรมพัฒนาพลังงานทดแทนและอนุรักษ์พลังงาน กระทรวงพลังงาน</p>
          <p>พิมพ์เมื่อ: {{ formatDateThai(new Date()) }} เวลา {{ new Date().toLocaleTimeString('th-TH') }} น.</p>
        </div>
      </div>
    </div> <!-- End report-content -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as htmlToImage from 'html-to-image'


// Type declaration for jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number
    }
    autoTable: (options: any) => void
  }
}

// Reactive data
const isExporting = ref(false)
const exportProgress = ref('')
const currentMonth = ref('ตุลาคม')
const currentYear = ref('2567')

// Generate mock data for electricity usage (flexible data)
const generateDailyUsage = () => {
  const data = []
  // สร้างข้อมูลได้หลายเดือน (เช่น 3 เดือน = 90 วัน)
  const totalDays = 65 // สามารถปรับได้ตามต้องการ
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date('2024-08-01') // เริ่มจากสิงหาคม
    date.setDate(i)
    const usage = Math.round((Math.random() * 15 + 20) * 10) / 10 // 20-35 kWh
    const cost = Math.round(usage * 5) // ราคา 5 บาทต่อหน่วย
    data.push({ date, usage, cost })
  }
  return data
}

const dailyUsage = ref(generateDailyUsage())

// Generate mock household data (more data for testing)
const generateHouseholdData = () => {
  const names = [
    'นายสมชาย ใจดี', 'นางสาวมาลี รักษ์ดี', 'นายจินดา อยู่เย็น', 'นางสุดา มีสุข',
    'นายพิชิต เจริญ', 'นางรัตนา สุขใส', 'นายอนันต์ ดีมาก', 'นางสมจิตร เก่งมาก',
    'นายวิชาย สุขใส', 'นางพิมพ์ใจ ดีงาม', 'นายสุรชัย ร่วงเริง', 'นางสาวนงลักษณ์ สวยงาม',
    'นายประยุทธ์ มั่นคง', 'นางอรุณี แสนดี', 'นายสมปอง เจริญ', 'นางสาวกาญจนา ใจบุญ',
    'นายบุญเลิศ ร่ำรวย', 'นางศิริ แสงแดด', 'นายวรพจน์ สุภาพ', 'นางสาวจันทร์เพ็ญ งดงาม',
    'นายเสรี เสรีภาพ', 'นางนิตยา นิรามัย', 'นายชาย ชาญชัย', 'นางสาวปราณี ปรีดี',
    'นายกิตติ กิตติคุณ', 'นางชุติมา ชุติธรรม', 'นายสันติ สันติธรรม', 'นางสาวสุกัญญา สุขสันต์',
    'นายประสิทธิ์ ประสงค์', 'นางภัทรา ภัทรพงศ์', 'นายกฤษณ์ กฤษณา', 'นางสาวปิยะดา ปิยสิริ',
    'นายธีรพล ธีรญาณ', 'นางสุนีย์ สุนทร', 'นายชัยยะ ชัยชนะ', 'นางสาวชลิตา ชลากร',
    'นายสุทัศน์ สุทัศน์วงศ์', 'นางอัจฉรา อัจฉราพงศ์', 'นายธนพล ธนาคาร', 'นางสาวรัชนี รัชนีกุล',
    'นายสมบัติ สมบูรณ์', 'นางสุพรรณ สุพรรณิกา', 'นายวิทยา วิทยาเวช', 'นางสาวสุภาพร สุภาพรรณ',
    'นายชาติชาย ชาติชายกุล', 'นางจิรารัตน์ จิรารัตน์วงศ์', 'นายสิริชัย สิริชัยกุล', 'นางสาวนันทนา นันทนาถ',
    'นายปิยะ ปิยะธรรม', 'นางอนุชา อนุชาติ', 'นายอนุวัตร อนุวัตรกุล', 'นางสาวอารีย์ อารีย์วรรณ'
  ]
  
  const types = ['ทั่วไป', 'ผู้สูงอายุ', 'ผู้ด้อยโอกาส']
  const data = []
  
  for (let i = 1; i <= 75; i++) { // 75 households
    const usage = Math.round((Math.random() * 100 + 50) * 10) / 10 // 50-150 kWh
    const cost = Math.round(usage * 5) // ราคา 5 บาทต่อหน่วย
    const type = types[Math.floor(Math.random() * types.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    
    data.push({
      id: `HH${String(i).padStart(3, '0')}`,
      name,
      usage,
      cost,
      type
    })
  }
  return data
}

const householdData = ref(generateHouseholdData())

// Pagination controls
const currentPage = ref(1)
const itemsPerPage = ref(25) // จำนวนรายการต่อหน้าที่เหมาะสำหรับการพิมพ์
const showAllInPDF = ref(true)

// Computed values
const totalUsage = computed(() => 
  dailyUsage.value.reduce((sum, day) => sum + day.usage, 0).toFixed(1)
)

const totalCost = computed(() => 
  dailyUsage.value.reduce((sum, day) => sum + day.cost, 0)
)

const averageDaily = computed(() => 
  (parseFloat(totalUsage.value) / dailyUsage.value.length).toFixed(1)
)


// Pagination computed values
const totalPages = computed(() => Math.ceil(dailyUsage.value.length / itemsPerPage.value))

const paginatedHouseholds = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return householdData.value.slice(start, end)
})

const paginatedDailyUsage = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return dailyUsage.value.slice(start, end)
})

const currentPageData = computed(() => 
  showAllInPDF.value ? dailyUsage.value : paginatedDailyUsage.value
)

const currentPageUsage = computed(() => 
  currentPageData.value.reduce((sum, day) => sum + day.usage, 0).toFixed(1)
)

const currentPageCost = computed(() => 
  currentPageData.value.reduce((sum, day) => sum + day.cost, 0)
)




// Helper functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatDateThai = (date: Date) => {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]
  const day = date.getDate()
  const month = thaiMonths[date.getMonth()]
  const year = date.getFullYear() + 543
  return `${day} ${month} ${year}`
}

const getUsageStatusThai = (usage: number) => {
  if (usage < 25) return 'ปกติ'
  if (usage < 30) return 'เฝ้าระวัง'
  return 'สูงกว่าปกติ'
}

const getUsageStatus = (usage: number) => {
  if (usage < 25) return 'ต่ำ'
  if (usage < 30) return 'ปกติ'
  return 'สูง'
}


const downloadPDF = async () => {
  isExporting.value = true;
  
  try {
    exportProgress.value = 'เริ่มต้นการสร้าง PDF...';
    console.log('กำลังสร้าง PDF...');

    const element = document.getElementById("report-content");
    if (!element) {
      throw new Error('ไม่พบข้อมูลที่จะส่งออก');
    }

    exportProgress.value = 'กำลังเตรียมข้อมูล...';

    // Prepare element for PDF export
    element.classList.add('pdf-export-mode');
    
    // Wait for layout to stabilize
    await new Promise(resolve => setTimeout(resolve, 300));

    // Configure options for better Thai font support
    const options = {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      style: {
        fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif",
        fontSize: '14px',
        lineHeight: '1.4'
      }
    };
    
    exportProgress.value = 'กำลังแปลงเป็นรูปภาพ...';

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    
    // Convert to canvas and add to PDF
    const canvas = await htmlToImage.toCanvas(element, options);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Check if content fits on one page
    const maxPageHeight = pageHeight - (margin * 2);
    
    if (imgHeight <= maxPageHeight) {
      // Single page
      pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
    } else {
      // Multiple pages
      const pages = Math.ceil(imgHeight / maxPageHeight);
      for (let i = 0; i < pages; i++) {
        if (i > 0) pdf.addPage();
        
        const sourceY = i * maxPageHeight * (canvas.height / imgHeight);
        const sourceHeight = Math.min(maxPageHeight * (canvas.height / imgHeight), canvas.height - sourceY);
        
        const pageCanvas = document.createElement('canvas');
        const ctx = pageCanvas.getContext('2d');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, sourceHeight);
          ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
          
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;
          pdf.addImage(pageImgData, 'JPEG', margin, margin, imgWidth, pageImgHeight);
        }
      }
    }

    
    exportProgress.value = 'กำลังบันทึก PDF...';
    
    // Save PDF with timestamp
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5).replace(':', '');
    const filename = `รายงานการใช้ไฟฟ้า-${dateStr}-${timeStr}.pdf`;
    
    pdf.save(filename);
    
    const totalPages = (pdf as any).internal.getNumberOfPages();
    console.log(`PDF สร้างเสร็จแล้ว: ${totalPages} หน้า`);
    
    // Show success message
    alert(`✅ PDF ดาวน์โหลดเรียบร้อยแล้ว!\n\nจำนวนหน้า: ${totalPages}\nข้อมูล: ${showAllInPDF.value ? 'ทั้งหมด' : 'เฉพาะหน้าปัจจุบัน'}`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert(`❌ เกิดข้อผิดพลาดในการสร้าง PDF\n\nรายละเอียด: ${error instanceof Error ? error.message : 'ข้อผิดพลาดไม่ทราบสาเหตุ'}`);
  } finally {
    // Restore UI
    const element = document.getElementById("report-content");
    if (element) {
      element.classList.remove('pdf-export-mode');
    }
    
    exportProgress.value = '';
    isExporting.value = false;
  }
}






</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');

#report-content {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

/* PDF Export specific styles for Government Documents */
@media print {
  @page {
    margin: 2.5cm 2cm 2cm 2cm;
    size: A4;
  }
  
  #report-content {
    box-shadow: none;
    font-family: 'Sarabun', 'TH Sarabun New', sans-serif;
    font-size: 14px;
    line-height: 1.4;
  }
  
  /* Government document table styles */
  table {
    page-break-inside: auto;
    border-collapse: collapse !important;
    border: 2px solid #000 !important;
    width: 100% !important;
  }
  
  /* Prevent row breaking but allow table to span pages */
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  td, th {
    border: 1px solid #000 !important;
    page-break-inside: avoid;
    padding: 8px 4px !important;
    text-align: center !important;
    vertical-align: middle !important;
  }
  
  /* Header styles */
  thead tr th {
    border: 2px solid #000 !important;
    background-color: #f0f0f0 !important;
    font-weight: bold !important;
    font-size: 13px !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Footer styles */
  tfoot tr td {
    border: 2px solid #000 !important;
    background-color: #f0f0f0 !important;
    font-weight: bold !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Ensure table headers repeat on each page */
  thead {
    display: table-header-group;
  }
  
  tbody {
    display: table-row-group;
  }
  
  tfoot {
    display: table-footer-group;
  }
  
  /* Page numbering */
  @page {
    @bottom-center {
      content: "หน้า " counter(page) " จาก " counter(pages);
      font-size: 12px;
      font-family: 'Sarabun', sans-serif;
    }
  }
  
  /* Government document formatting */
  h1, h2, h3 {
    font-weight: bold !important;
    color: #000 !important;
  }
  
  .signature-line {
    border-bottom: 1px solid #000 !important;
    min-height: 40px;
  }
}

/* Remove scrollbars for PDF export */
.pdf-export-mode {
  overflow: visible !important;
  max-height: none !important;
  height: auto !important;
}

.pdf-export-mode .overflow-x-auto,
.pdf-export-mode .pdf-table-container {
  overflow: visible !important;
  overflow-x: visible !important;
  overflow-y: visible !important;
  max-width: none !important;
  width: 100% !important;
}

.pdf-export-mode table,
.pdf-export-mode .pdf-table {
  width: 100% !important;
  table-layout: auto !important;
  page-break-inside: auto;
  overflow: visible !important;
  display: table !important;
}

.pdf-export-mode tr {
  page-break-inside: avoid;
  page-break-after: auto;
  break-inside: avoid;
  display: table-row !important;
}

.pdf-export-mode tbody tr {
  break-inside: avoid;
  page-break-inside: avoid;
}

.pdf-export-mode td,
.pdf-export-mode th {
  page-break-inside: avoid;
  break-inside: avoid;
  white-space: nowrap;
  overflow: visible !important;
}

/* Hide scroll indicators completely */
.pdf-export-mode ::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.pdf-export-mode {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

/* Ensure Thai fonts are loaded for PDF export */
.thai-text {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-feature-settings: "liga" 1;
}

/* Better table spacing for PDF */
.pdf-table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.pdf-table td,
.pdf-table th {
  padding: 8px 12px;
  border: 1px solid #d1d5db !important;
  vertical-align: top;
  word-wrap: break-word;
  page-break-inside: avoid;
}

.pdf-table td {
  padding: 8px 12px;
  border: 1px solid #d1d5db !important;
  vertical-align: top;
  word-wrap: break-word;
  page-break-inside: avoid;
}

.pdf-table thead th {
  background-color: #f9fafb;
  font-weight: 600;
  border: 1px solid #d1d5db !important;
}

.pdf-table {
  border-collapse: collapse !important;
  width: 100% !important;
  border: 2px solid #374151 !important;
}

/* Enhanced PDF styles for proper page continuity */
.pdf-export-mode .pdf-table {
  border-collapse: collapse !important;
  border: 2px solid #374151 !important;
}

.pdf-export-mode .pdf-table td,
.pdf-export-mode .pdf-table th {
  border: 1px solid #374151 !important;
  page-break-inside: avoid;
  padding: 8px 12px;
}

.pdf-export-mode .pdf-table thead th {
  border: 2px solid #374151 !important;
  background-color: #f9fafb !important;
  font-weight: 600;
}

.pdf-export-mode .pdf-table tbody tr:first-child td {
  border-top: 2px solid #374151 !important;
}

.pdf-export-mode .pdf-table tbody tr:last-child td {
  border-bottom: 2px solid #374151 !important;
}

.pdf-export-mode .pdf-table td:first-child,
.pdf-export-mode .pdf-table th:first-child {
  border-left: 2px solid #374151 !important;
}

.pdf-export-mode .pdf-table td:last-child,
.pdf-export-mode .pdf-table th:last-child {
  border-right: 2px solid #374151 !important;
}

/* Ensure table spans across pages properly */
.pdf-export-mode table {
  page-break-before: auto !important;
  page-break-after: auto !important;
  page-break-inside: auto !important;
}

.pdf-export-mode tbody {
  page-break-before: auto !important;
  page-break-after: auto !important;
  page-break-inside: auto !important;
}

/* Force borders on all sides for page continuity */
@page {
  margin: 2cm;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Enhanced table border handling for page breaks */
  .pdf-table {
    border-spacing: 0 !important;
    border-collapse: separate !important;
    border: 2px solid #374151 !important;
  }
  
  .pdf-table td,
  .pdf-table th {
    border: 1px solid #374151 !important;
    box-sizing: border-box;
  }
  
  /* Force header on every page */
  .pdf-table thead {
    display: table-header-group !important;
  }
  
  .pdf-table tbody {
    display: table-row-group !important;
  }
}
</style>