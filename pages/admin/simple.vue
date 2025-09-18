<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-primary">รายงานการใช้ไฟฟ้า</h1>
      <div class="flex gap-3">
        <!-- PDF Export Options -->
        <div class="form-control">
          <label class="label cursor-pointer">
            <input type="checkbox" v-model="showAllInPDF" class="checkbox checkbox-sm" />
            <span class="label-text ml-2">รวมข้อมูลทั้งหมดใน PDF</span>
          </label>
        </div>
        
        <BaseButton 
          @click="downloadPDF" 
          color="primary" 
          size="md"
          :loading="isExporting"
          class="flex items-center gap-2"
        >
          <div class="flex gap-2">
            <BaseIcon name="document-arrow-down" size="sm" /> 
            <span> ส่งออก PDF </span>
          </div>
        </BaseButton>
      </div>
    </div>

    <!-- Report Content -->
    <div id="report-content" class="bg-white p-8 rounded-lg shadow-lg">
      <!-- Header Info -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">รายงานการใช้ไฟฟ้า</h1>
        <p class="text-gray-600">ประจำเดือน {{ currentMonth }} {{ currentYear }}</p>
        <p class="text-sm text-gray-500">สร้างเมื่อ: {{ formatDate(new Date()) }}</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-600">การใช้ไฟรวม</p>
              <p class="text-2xl font-bold text-blue-900">{{ totalUsage }} kWh</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BaseIcon name="bolt" size="lg" class="text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-600">ค่าไฟรวม</p>
              <p class="text-2xl font-bold text-green-900">฿{{ totalCost.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BaseIcon name="banknotes" size="lg" class="text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-orange-600">การใช้ไฟเฉลี่ย/วัน</p>
              <p class="text-2xl font-bold text-orange-900">{{ averageDaily }} kWh</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <BaseIcon name="calendar-days" size="lg" class="text-orange-600" />
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-purple-600">จำนวนครัวเรือน</p>
              <p class="text-2xl font-bold text-purple-900">{{ householdCount }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BaseIcon name="home" size="lg" class="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Usage Chart (Table format for PDF) -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">การใช้ไฟรายวัน</h2>
        <div class="overflow-x-auto pdf-table-container">
          <table class="w-full border-collapse border border-gray-300 pdf-table">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 px-4 py-2 text-left">วันที่</th>
                <th class="border border-gray-300 px-4 py-2 text-right">การใช้ไฟ (kWh)</th>
                <th class="border border-gray-300 px-4 py-2 text-right">ค่าไฟ (บาท)</th>
                <th class="border border-gray-300 px-4 py-2 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="day in (showAllInPDF ? dailyUsage : paginatedDailyUsage)" :key="day.date" class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">{{ formatDate(day.date) }}</td>
                <td class="border border-gray-300 px-4 py-2 text-right">{{ day.usage }}</td>
                <td class="border border-gray-300 px-4 py-2 text-right">{{ day.cost.toLocaleString() }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span :class="getUsageStatusClass(day.usage)">
                    {{ getUsageStatus(day.usage) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Household Details -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">รายละเอียดการใช้ไฟตามครัวเรือน</h2>
        <div class="overflow-x-auto pdf-table-container">
          <table class="w-full border-collapse border border-gray-300 pdf-table">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 px-4 py-2 text-left">รหัสครัวเรือน</th>
                <th class="border border-gray-300 px-4 py-2 text-left">ชื่อ-นามสกุล</th>
                <th class="border border-gray-300 px-4 py-2 text-right">การใช้ไฟ (kWh)</th>
                <th class="border border-gray-300 px-4 py-2 text-right">ค่าไฟ (บาท)</th>
                <th class="border border-gray-300 px-4 py-2 text-center">ประเภท</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="household in (showAllInPDF ? householdData : paginatedHouseholds)" :key="household.id" class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">{{ household.id }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ household.name }}</td>
                <td class="border border-gray-300 px-4 py-2 text-right">{{ household.usage }}</td>
                <td class="border border-gray-300 px-4 py-2 text-right">{{ household.cost.toLocaleString() }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span :class="getHouseholdTypeClass(household.type)">
                    {{ household.type }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Controls (only show when not including all data in display) -->
        <div v-if="!showAllInPDF && totalPages > 1" class="flex justify-center items-center gap-4 mt-6">
          <button 
            @click="currentPage = currentPage - 1" 
            :disabled="currentPage === 1"
            class="btn btn-sm btn-outline"
          >
            <BaseIcon name="chevron-left" size="sm" />
            ก่อนหน้า
          </button>
          
          <div class="flex items-center gap-2">
            <span class="text-sm">หน้า</span>
            <select v-model="currentPage" class="select select-sm select-bordered">
              <option v-for="page in totalPages" :key="page" :value="page">
                {{ page }}
              </option>
            </select>
            <span class="text-sm">จาก {{ totalPages }}</span>
          </div>
          
          <button 
            @click="currentPage = currentPage + 1" 
            :disabled="currentPage === totalPages"
            class="btn btn-sm btn-outline"
          >
            ถัดไป
            <BaseIcon name="chevron-right" size="sm" />
          </button>
        </div>

        <!-- Data summary -->
        <div class="text-center mt-4 text-sm text-gray-600">
          <span v-if="showAllInPDF">
            แสดงข้อมูลทั้งหมด: {{ householdData.length }} ครัวเรือน, {{ dailyUsage.length }} วัน
          </span>
          <span v-else>
            แสดง {{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, householdData.length) }} 
            จาก {{ householdData.length }} ครัวเรือน
          </span>
        </div>
      </div>

      <!-- Usage Analysis -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">การวิเคราะห์การใช้ไฟ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-3">สถิติการใช้ไฟ</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>การใช้ไฟสูงสุด:</span>
                <span class="font-semibold">{{ maxUsage }} kWh</span>
              </div>
              <div class="flex justify-between">
                <span>การใช้ไฟต่ำสุด:</span>
                <span class="font-semibold">{{ minUsage }} kWh</span>
              </div>
              <div class="flex justify-between">
                <span>ส่วนเบียงเบนมาตรฐาน:</span>
                <span class="font-semibold">{{ standardDeviation }} kWh</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-3">เปรียบเทียบเดือนก่อน</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>การใช้ไฟเดือนนี้:</span>
                <span class="font-semibold">{{ totalUsage }} kWh</span>
              </div>
              <div class="flex justify-between">
                <span>การใช้ไฟเดือนก่อน:</span>
                <span class="font-semibold">{{ previousMonthUsage }} kWh</span>
              </div>
              <div class="flex justify-between">
                <span>ผลต่าง:</span>
                <span :class="usageChangeClass">{{ usageChange }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
        <p>รายงานนี้สร้างขึ้นโดยระบบจัดการการใช้ไฟฟ้า</p>
        <p>ข้อมูล ณ วันที่ {{ formatDate(new Date()) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as htmlToImage from 'html-to-image'

// Function to configure Thai-friendly font
const configureThaiFont = (pdf: jsPDF) => {
  // Use a combination approach for better Thai support
  try {
    // Try courier first (better Unicode support)
    pdf.setFont('courier', 'normal')
    return 'courier'
  } catch (error) {
    console.warn('Courier font failed, using helvetica:', error)
    pdf.setFont('helvetica', 'normal')
    return 'helvetica'
  }
}

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
const currentMonth = ref('กันยายน')
const currentYear = ref('2567')

// Generate mock data for electricity usage (more data for testing)
const generateDailyUsage = () => {
  const data = []
  for (let i = 1; i <= 60; i++) { // 60 days of data
    const date = new Date('2024-09-01')
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
const itemsPerPage = ref(20)
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

const householdCount = computed(() => householdData.value.length)

// Pagination computed values
const totalPages = computed(() => Math.ceil(householdData.value.length / itemsPerPage.value))

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

// For PDF export - use all data or paginated
const exportHouseholds = computed(() => 
  showAllInPDF.value ? householdData.value : paginatedHouseholds.value
)

const exportDailyUsage = computed(() => 
  showAllInPDF.value ? dailyUsage.value : paginatedDailyUsage.value
)

const maxUsage = computed(() => 
  Math.max(...dailyUsage.value.map(d => d.usage)).toFixed(1)
)

const minUsage = computed(() => 
  Math.min(...dailyUsage.value.map(d => d.usage)).toFixed(1)
)

const standardDeviation = computed(() => {
  const avg = parseFloat(averageDaily.value)
  const variance = dailyUsage.value.reduce((sum, day) => 
    sum + Math.pow(day.usage - avg, 2), 0) / dailyUsage.value.length
  return Math.sqrt(variance).toFixed(1)
})

const previousMonthUsage = ref(385.2)
const usageChange = computed(() => {
  const change = parseFloat(totalUsage.value) - previousMonthUsage.value
  const percentage = ((change / previousMonthUsage.value) * 100).toFixed(1)
  return `${change > 0 ? '+' : ''}${change.toFixed(1)} kWh (${percentage}%)`
})

const usageChangeClass = computed(() => {
  const change = parseFloat(totalUsage.value) - previousMonthUsage.value
  return change > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'
})

// Helper functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getUsageStatus = (usage: number) => {
  if (usage < 25) return 'ต่ำ'
  if (usage < 30) return 'ปกติ'
  return 'สูง'
}

const getUsageStatusClass = (usage: number) => {
  if (usage < 25) return 'px-2 py-1 rounded text-xs bg-green-100 text-green-800'
  if (usage < 30) return 'px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800'
  return 'px-2 py-1 rounded text-xs bg-red-100 text-red-800'
}

const getHouseholdTypeClass = (type: string) => {
  switch(type) {
    case 'ผู้สูงอายุ':
      return 'px-2 py-1 rounded text-xs bg-blue-100 text-blue-800'
    case 'ผู้ด้อยโอกาส':
      return 'px-2 py-1 rounded text-xs bg-purple-100 text-purple-800'
    default:
      return 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-800'
  }
}

const downloadPDF = async () => {
  isExporting.value = true;
  
  try {
    console.log('Creating PDF with working hybrid approach...');

    const element = document.getElementById("report-content");
    if (!element) {
      alert('ไม่พบข้อมูลที่จะส่งออก');
      return;
    }

    // Hide summary cards and analysis section
    const summaryCards = element.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4');
    summaryCards.forEach(card => {
      card.style.display = 'none';
    });

    const analysisSection = element.querySelector('.mb-8 h2');
    if (analysisSection && analysisSection.textContent.includes('การวิเคราะห์')) {
      analysisSection.closest('.mb-8').style.display = 'none';
    }

    // Add PDF export class for styling
    element.classList.add('pdf-export-mode');

    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Configure html-to-image options for Thai font support
    const options = {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        fontFamily: "'Sarabun', 'Noto Sans Thai', 'Helvetica Neue', sans-serif"
      }
    };

    // Get data to export - combine all data into single array with 35 rows per page
    const dailyDataToExport = showAllInPDF.value ? dailyUsage.value : paginatedDailyUsage.value;
    const householdDataToExport = showAllInPDF.value ? householdData.value : paginatedHouseholds.value;
    
    // Combine all data into a single array for pagination
    const allData = [
      ...dailyDataToExport.map(item => ({ ...item, type: 'daily' })),
      ...householdDataToExport.map(item => ({ ...item, type: 'household' }))
    ];
    
    const rowsPerPage = 35;
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    console.log(`Total data rows: ${allData.length}, Total pages: ${totalPages}`);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    
    // Store original data
    const originalDailyUsage = [...dailyUsage.value];
    const originalHouseholdData = [...householdData.value];
    const originalShowAll = showAllInPDF.value;
    
    try {
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        console.log(`Generating page ${pageIndex + 1} of ${totalPages}...`);
        
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        // Get 35 rows for this page
        const startIndex = pageIndex * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, allData.length);
        const currentPageData = allData.slice(startIndex, endIndex);
        
        // Separate daily and household data for this page
        const dailyForThisPage = currentPageData.filter(item => item.type === 'daily');
        const householdForThisPage = currentPageData.filter(item => item.type === 'household');
        
        // Remove the type property
        const cleanDailyData = dailyForThisPage.map(({type, ...rest}) => rest);
        const cleanHouseholdData = householdForThisPage.map(({type, ...rest}) => rest);
        
        console.log(`Page ${pageIndex + 1}: ${cleanDailyData.length} daily, ${cleanHouseholdData.length} household`);
        
        // Update Vue data for this page
        dailyUsage.value = cleanDailyData;
        householdData.value = cleanHouseholdData;
        showAllInPDF.value = true;
        
        // Force Vue to update the DOM
        await new Promise(resolve => {
          nextTick(() => {
            setTimeout(resolve, 400);
          });
        });
        
        // Capture the updated content
        const canvas = await htmlToImage.toCanvas(element, options);
        
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', margin, 15, imgWidth, imgHeight);
      }
      
    } finally {
      // Always restore original data
      dailyUsage.value = originalDailyUsage;
      householdData.value = originalHouseholdData;
      showAllInPDF.value = originalShowAll;
    }

    // Save PDF
    const filename = `electricity-report-${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(filename);
    
    const totalPagesGenerated = pdf.internal.getNumberOfPages();
    alert(`PDF ดาวน์โหลดเรียบร้อยแล้ว! (${totalPagesGenerated} หน้า, ${rowsPerPage} แถว/หน้า)`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert(`เกิดข้อผิดพลาด: ${error.message}`);
  } finally {
    // Restore UI
    const element = document.getElementById("report-content");
    if (element) {
      element.classList.remove('pdf-export-mode');
      
      // Restore hidden elements
      const summaryCards = element.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4');
      summaryCards.forEach(card => {
        card.style.display = '';
      });
      
      const analysisSection = element.querySelector('.mb-8 h2');
      if (analysisSection && analysisSection.textContent.includes('การวิเคราะห์')) {
        analysisSection.closest('.mb-8').style.display = '';
      }
    }
    
    isExporting.value = false;
  }
}

// Function to create PDF sections with continuous layout
const createPDFSections = async (addSectionToPdf, pdf) => {
  // Create single continuous document
  const dailyData = showAllInPDF.value ? dailyUsage.value : paginatedDailyUsage.value;
  const householdData_ = showAllInPDF.value ? householdData.value : paginatedHouseholds.value;
  
  const fullHtml = `
    <div class="bg-white" style="
      font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
      width: 210mm;
      padding: 5mm;
      box-sizing: border-box;
      font-size: 10px;
      line-height: 1.2;
    ">
      <!-- Header Section -->
      <div class="text-center" style="margin-bottom: 15px;">
        <h1 style="font-size: 22px; font-weight: bold; color: #1f2937; margin-bottom: 5px;">รายงานการใช้ไฟฟ้า</h1>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 3px;">ประจำเดือน ${currentMonth.value} ${currentYear.value}</p>
        <p style="color: #6b7280; font-size: 10px;">สร้างเมื่อ: ${formatDate(new Date())}</p>
      </div>
      
      <!-- Daily Usage Section -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; font-weight: bold; color: #1f2937; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">การใช้ไฟรายวัน</h2>
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 9px;
          margin-bottom: 10px;
        ">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: left; font-weight: 600;">วันที่</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-weight: 600;">การใช้ไฟ (kWh)</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-weight: 600;">ค่าไฟ (บาท)</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: center; font-weight: 600;">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            ${dailyData.map(day => `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; font-size: 8px;">${formatDate(day.date)}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-size: 8px;">${day.usage}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-size: 8px;">${day.cost.toLocaleString()}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: center; font-size: 8px;">
                  <span style="padding: 1px 4px; border-radius: 2px; font-size: 7px; ${getStatusStyle(day.usage)}">${getUsageStatus(day.usage)}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Household Section -->
      <div style="margin-bottom: 10px;">
        <h2 style="font-size: 14px; font-weight: bold; color: #1f2937; margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px;">รายละเอียดการใช้ไฟตามครัวเรือน</h2>
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 9px;
        ">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: left; font-weight: 600; width: 12%;">รหัสครัวเรือน</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: left; font-weight: 600; width: 40%;">ชื่อ-นามสกุล</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-weight: 600; width: 16%;">การใช้ไฟ (kWh)</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-weight: 600; width: 18%;">ค่าไฟ (บาท)</th>
              <th style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: center; font-weight: 600; width: 14%;">ประเภท</th>
            </tr>
          </thead>
          <tbody>
            ${householdData_.map(household => `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; font-size: 8px;">${household.id}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; font-size: 8px;">${household.name}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-size: 8px;">${household.usage}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: right; font-size: 8px;">${household.cost.toLocaleString()}</td>
                <td style="border: 1px solid #d1d5db; padding: 4px 6px; text-align: center; font-size: 8px;">
                  <span style="padding: 1px 4px; border-radius: 2px; font-size: 7px; ${getHouseholdStatusStyle(household.type)}">${household.type}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Create single document
  const fullDiv = document.createElement('div');
  fullDiv.innerHTML = fullHtml;
  document.body.appendChild(fullDiv);
  await addSectionToPdf(fullDiv, true);
  document.body.removeChild(fullDiv);
}

// Helper functions for English status
const getUsageStatusEn = (usage: number) => {
  if (usage < 25) return 'Low'
  if (usage < 30) return 'Normal'
  return 'High'
}

const getHouseholdTypeEn = (type: string) => {
  switch(type) {
    case 'ผู้สูงอายุ':
      return 'Elderly'
    case 'ผู้ด้อยโอกาส':
      return 'Low Income'
    default:
      return 'General'
  }
}

// Helper functions for inline styles (since class-based styles won't work in HTML strings)
const getStatusStyle = (usage) => {
  if (usage < 25) return 'background-color: #dcfce7; color: #166534;'
  if (usage < 30) return 'background-color: #fef3c7; color: #92400e;'
  return 'background-color: #fee2e2; color: #991b1b;'
}

const getHouseholdStatusStyle = (type) => {
  switch(type) {
    case 'ผู้สูงอายุ':
      return 'background-color: #dbeafe; color: #1e40af;'
    case 'ผู้ด้อยโอกาส':
      return 'background-color: #e9d5ff; color: #7c3aed;'
    default:
      return 'background-color: #f3f4f6; color: #374151;'
  }
}

// PDF Export function - back to working approach without summary
const exportToPDF = async () => {
  isExporting.value = true
  
  try {
    console.log('Creating PDF with hybrid approach...')
    
    // Show loading message for large datasets
    if (showAllInPDF.value && (householdData.value.length > 50 || dailyUsage.value.length > 50)) {
      alert('กำลังสร้าง PDF สำหรับข้อมูลจำนวนมาก กรุณารอสักครู่...')
    }

    // Get the report element and temporarily hide navigation
    const reportElement = document.getElementById('report-content')
    if (!reportElement) {
      throw new Error('Report content not found')
    }

    // Hide summary cards temporarily
    const summaryCards = reportElement.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4')
    summaryCards.forEach(card => {
      card.style.display = 'none'
    })

    // Hide analysis section temporarily  
    const analysisSection = reportElement.querySelector('.mb-8 h2')
    if (analysisSection && analysisSection.textContent.includes('การวิเคราะห์')) {
      analysisSection.closest('.mb-8').style.display = 'none'
    }

    // Temporarily hide pagination controls
    const paginationElements = document.querySelectorAll('.btn, .select, [class*="pagination"], .form-control')
    const originalDisplay = []
    paginationElements.forEach((el, index) => {
      if (!el.closest('#report-content')) {
        originalDisplay[index] = el.style.display
        el.style.display = 'none'
      }
    })

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 8
    
    // Use data based on current settings
    const dataToExport = showAllInPDF.value ? householdData.value : paginatedHouseholds.value
    const dailyDataToExport = showAllInPDF.value ? dailyUsage.value : paginatedDailyUsage.value
    
    // Configure html-to-image options
    const options = {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif"
      }
    }

    // Helper function to capture HTML as image and add to PDF
    const addHtmlToPdf = async (element, addNewPage = true) => {
      if (addNewPage && pdf.internal.getNumberOfPages() > 0) {
        pdf.addPage()
      }
      
      const canvas = await htmlToImage.toCanvas(element, options)
      const imgWidth = pageWidth - (margin * 2)
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      // Check if we need to split across pages
      const maxHeightPerPage = pageHeight - (margin * 2)
      
      if (imgHeight <= maxHeightPerPage) {
        // Fits on one page
        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight)
      } else {
        // Split across multiple pages
        const pagesNeeded = Math.ceil(imgHeight / maxHeightPerPage)
        
        for (let page = 0; page < pagesNeeded; page++) {
          if (page > 0) {
            pdf.addPage()
            // Add header on each page
            // pdf.setFontSize(16);
            // pdf.setFont('helvetica', 'bold');
            // pdf.text('Electricity Usage Report', 105, 15, { align: 'center' });
            
            // pdf.setFontSize(12);
            // pdf.setFont('helvetica', 'normal');
            // pdf.text(`Month: ${currentMonth.value} Year: ${currentYear.value}`, 105, 25, { align: 'center' });
            
            // pdf.setFontSize(10);
            // pdf.text(`Generated: ${new Date().toLocaleDateString('en-US')} - Page ${page + 1}`, 105, 35, { align: 'center' });
          }
          
          // Adjust available height for subsequent pages with header
          const availablePageHeight = page === 0 ? maxHeightPerPage : maxHeightPerPage - 7; // Minimal space for header
          const sourceY = page === 0 ? 0 : (maxHeightPerPage - 7) * page * (canvas.width / imgWidth)
          const sourceHeight = Math.min(availablePageHeight * (canvas.width / imgWidth), canvas.height - sourceY)
          
          const pageCanvas = document.createElement('canvas')
          const pageCtx = pageCanvas.getContext('2d')
          pageCanvas.width = canvas.width
          pageCanvas.height = sourceHeight
          
          pageCtx.fillStyle = '#ffffff'
          pageCtx.fillRect(0, 0, canvas.width, sourceHeight)
          
          pageCtx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, canvas.width, sourceHeight
          )
          
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95)
          const pageImgHeight = (sourceHeight * imgWidth) / canvas.width
          const yPosition = page === 0 ? margin : 15; // Minimal margin for all pages
          pdf.addImage(pageImgData, 'JPEG', margin, yPosition, imgWidth, pageImgHeight)
        }
      }
    }

    // Temporarily modify report content to show correct data
    const originalShowAll = showAllInPDF.value
    if (!originalShowAll) {
      // Force show all data for PDF even if paginated view is selected
      showAllInPDF.value = true
      await new Promise(resolve => setTimeout(resolve, 500)) // Wait for reactivity
    }

    // Apply PDF-friendly styles
    reportElement.classList.add('pdf-export-mode')
    
    // Wait for layout and fonts to stabilize
    await new Promise(resolve => setTimeout(resolve, 800))

    // Capture the entire report
    await addHtmlToPdf(reportElement, false)

    // Restore original settings
    reportElement.classList.remove('pdf-export-mode')
    showAllInPDF.value = originalShowAll

    // Restore hidden elements
    summaryCards.forEach(card => {
      card.style.display = ''
    })

    if (analysisSection && analysisSection.textContent.includes('การวิเคราะห์')) {
      analysisSection.closest('.mb-8').style.display = ''
    }

    // Restore pagination controls
    paginationElements.forEach((el, index) => {
      if (originalDisplay[index] !== undefined) {
        el.style.display = originalDisplay[index] || ''
      }
    })

    // Save PDF with descriptive filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')
    const dataSize = originalShowAll ? 'Full' : `Page${currentPage.value}`
    const fileName = `Electricity_Report_Thai_${dataSize}_${dataToExport.length}HH_${timestamp}.pdf`
    
    pdf.save(fileName)
    
    const totalPages = pdf.internal.getNumberOfPages()
    const message = originalShowAll 
      ? `PDF ดาวน์โหลดเรียบร้อยแล้ว! (${dataToExport.length} ครัวเรือน, ${totalPages} หน้า)`
      : `PDF ดาวน์โหลดเรียบร้อยแล้ว! (หน้า ${currentPage.value}, ${totalPages} หน้า PDF)`
    alert(message)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    
    // Restore UI in case of error
    const reportElement = document.getElementById('report-content')
    if (reportElement) {
      reportElement.classList.remove('pdf-export-mode')
    }
    
    alert(`เกิดข้อผิดพลาด: ${error.message}`)
  } finally {
    isExporting.value = false
  }
}

// Pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');

#report-content {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

/* PDF Export specific styles */
@media print {
  #report-content {
    box-shadow: none;
    font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  }
  
  /* Prevent table rows from breaking across pages */
  table {
    page-break-inside: auto;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  /* Ensure table headers repeat on each page */
  thead {
    display: table-header-group;
  }
  
  tbody {
    display: table-row-group;
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
  border: 1px solid #d1d5db;
  vertical-align: top;
  word-wrap: break-word;
}

.pdf-table thead th {
  background-color: #f9fafb;
  font-weight: 600;
}
</style>