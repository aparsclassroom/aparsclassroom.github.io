document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.varsity.aparsclassroom.com/api/v1/check-eligibility/all')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        initializeCalendarAndCountdown(data.data);
        tableData = data.data;
        renderTable();
      }
    })
    .catch(error => {
      Swal.fire({
        title: "Information not available",
        text: "Please try again later.",
        icon: "info",
        confirmButtonText: '<a href="/shop" class="hover:no-underline hover:text-white">Visit Available Courses</a>',
      })
    });
});

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Add suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  return `${day}${suffix} ${month} ${year}`;
}

function initializeCalendarAndCountdown(universities) {
  // Sort exam dates and find the next upcoming exam
  const examDates = universities.map(uni => ({
    date: new Date(uni.exam_date),
    name: uni.university_name,
    type: uni.type,
    apply_start_date: uni.apply_start_date,
    apply_end_date: uni.apply_end_date,
    admission_type: uni.admission_type,
  })).sort((a, b) => a.date - b.date);

  const nextExam = examDates.find(exam => exam.date > new Date());

  if (nextExam) {
    // Initialize countdown
    updateCountdown(nextExam);
    setInterval(() => updateCountdown(nextExam), 1000);

    // Show next exam info
    document.getElementById('nextExamInfo').innerHTML = `
    <p class="bangla"> পরীক্ষার নাম - ${nextExam.name}</p>
    <p class="bangla"> তারিখ - ${formatDate(nextExam.date)}</p>
    <p class="bangla"> আপ্লিকেশন শুরু - ${nextExam.apply_start_date}</p>
    <p class="bangla"> আপ্লিকেশন শেষ - ${nextExam.apply_end_date}</p>
    <p class="bangla"> পরীক্ষা হবে - ${nextExam.admission_type}</p>
`;
  }

  document.getElementById('calendarloading').style.display = 'none';

  // Initialize calendar
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: universities.map(uni => ({
      title: uni.university_short_name,
      start: uni.exam_date,
      backgroundColor: getCategoryColor(uni.type),
      borderColor: getCategoryColor(uni.type),
      textColor: '#000000',
      display: 'block',
      extendedProps: {
        university: uni.university_name,
        type: uni.admission_type
      }
    })),
    eventClick: function (info) {
      Swal.fire({
        title: info.event.extendedProps.university,
        html: `
                        <p>Exam Date: ${info.event.start.toLocaleDateString()}</p>
                        <p>Exam type: ${info.event.extendedProps.type}</p>
                    `,
        icon: 'info'
      });
    }
  });

  calendar.render();
}

function updateCountdown(nextExam) {
  const now = new Date().getTime();
  const distance = nextExam.date.getTime() - now;

  document.getElementById('days').textContent =
    Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  document.getElementById('hours').textContent =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  document.getElementById('minutes').textContent =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  document.getElementById('seconds').textContent =
    Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}

function getCategoryColor(type) {
  switch (type?.toLowerCase()) {
    case 'varsity': return '#F2F5B3';
    case 'medical': return '#C4F5A9';
    case 'engineering': return '#B7F7EC';
    default: return '#6B7280';
  }
}

const inputs = {
  'SSCroll': 6,
  'HSCroll': 6,
  'SSCreg': 10
};

Object.entries(inputs).forEach(([inputName, length]) => {
  const input = document.querySelector(`input[name="${inputName}"]`);
  if (input) {
    input.addEventListener('input', function (e) {
      // Only allow numbers
      this.value = this.value.replace(/\D/g, '');

      // Limit length
      if (this.value.length > length) {
        this.value = this.value.slice(0, length);
      }

      // Clear error when typing
      clearError(this);

      // Validate on input
      const error = validateInputNumber(this, length);
      if (error && this.value.length > 0) {
        showError(this, error);
      }
    });

    input.addEventListener('blur', function () {
      if (this.value.length > 0) {
        const error = validateInputNumber(this, length);
        if (error) {
          showError(this, error);
        }
      }
    });
  }
});

function validateInputNumber(input, length) {
  const value = input.value.trim();
  const numberRegex = /^\d+$/;

  if (!numberRegex.test(value)) {
    return `Only numbers are allowed`;
  }

  if (value.length !== length) {
    return `Must be exactly ${length} digits`;
  }

  return null;
}

function showError(input, message) {
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (!errorDiv) {
    const div = document.createElement('div');
    div.className = 'error-message text-red-500 text-sm mt-1';
    div.textContent = message;
    input.parentElement.appendChild(div);
  } else {
    errorDiv.textContent = message;
  }
  input.classList.add('border-red-500');
}

function clearError(input) {
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
  input.classList.remove('border-red-500');
}


const autoForm = document.getElementById("autoform");
const manualForm = document.getElementById("manualform");

async function handleAutoSubmit(formData) {
  const autoSubmitButton = document.getElementById("autosubbtn");
  autoSubmitButton.disabled = true;
  autoSubmitButton.textContent = "Processing...";
  try {
    const sscRoll = document.querySelector('input[name="SSCroll"]');
    const hscRoll = document.querySelector('input[name="HSCroll"]');
    const sscReg = document.querySelector('input[name="SSCreg"]');

    let hasError = false;

    // Clear previous errors
    [sscRoll, hscRoll, sscReg].forEach(input => clearError(input));

    // Validate SSC Roll
    const sscRollError = validateInputNumber(sscRoll, 6);
    if (sscRollError) {
      showError(sscRoll, sscRollError);
      hasError = true;
    }

    // Validate HSC Roll
    const hscRollError = validateInputNumber(hscRoll, 6);
    if (hscRollError) {
      showError(hscRoll, hscRollError);
      hasError = true;
    }

    // Validate SSC Registration
    const sscRegError = validateInputNumber(sscReg, 10);
    if (sscRegError) {
      showError(sscReg, sscRegError);
      hasError = true;
    }

    if (hasError) {
      autoSubmitButton.disabled = false;
      autoSubmitButton.textContent = "Submit";
      return;
    }
    // First SSC API Call
    const sscResponse = await fetch('https://api.varsity.aparsclassroom.com/api/v1/check-eligibility/ssc-hsc/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        exam: formData.get('SSCexam'),
        year: formData.get('SSCYear'),
        board: formData.get('SSCboard'),
        roll: formData.get('SSCroll'),
        reg: formData.get('SSCreg')
      })
    });

    const sscData = await sscResponse.json();
    if (!sscData.success || sscData.data === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not find your result, please check and try again.'
      });
      autoSubmitButton.disabled = false;
      autoSubmitButton.textContent = "Search Again";
      return;
    }

    // Then HSC API Call
    const hscResponse = await fetch('https://api.varsity.aparsclassroom.com/api/v1/check-eligibility/ssc-hsc/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        exam: formData.get('HSCexam'),
        year: formData.get('HSCYear'),
        board: formData.get('HSCboard'),
        roll: formData.get('HSCroll'),
        reg: formData.get('SSCreg')
      })
    });

    const hscData = await hscResponse.json();
    if (!hscData.success || hscData.data === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not find your result, please check and try again.'
      });
      autoSubmitButton.disabled = false;
      autoSubmitButton.textContent = "Search Again";
      return;
    }

    // Prepare GPA object from HSC subject grades
    const gpaObject = hscData.data.subjectGrade.reduce((acc, item) => {
      if (item.subject && item.point) {
        acc[item.subject] = parseFloat(item.point);
      }
      return acc;
    }, {});

    // Prepare final data for eligibility check
    const eligibilityData = {
      ...gpaObject,
      sscGPA: parseFloat(sscData.data.sscGPA),
      hscGPA: parseFloat(hscData.data.hscGPA),
      sscYear: formData.get('SSCYear'),
      hscYear: formData.get('HSCYear'),
      secondTimer: hscData.data.secondTimer || "no"
    };

    // Validate all required GPA fields
    const requiredFields = [
      "physicsGPA", "chemistryGPA", "mathGPA", "biologyGPA",
      "englishGPA", "ictGPA", "banglaGPA", "sscGPA", "hscGPA"
    ];

    const missingFields = requiredFields.filter(field =>
      eligibilityData[field] === undefined ||
      eligibilityData[field] === null ||
      isNaN(eligibilityData[field])
    );

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'তোমার তথ্য পাওয়া যায়নি',
        text: 'দুঃখিত, তোমার কিছু তথ্য পাওয়া যায়নি। অনুগ্রহ করে ম্যানুয়াল মোডে গিয়ে তোমার তথ্য দিয়ে আবার চেষ্টা করো।',
        confirmButtonText: 'ঠিক আছে'
      }).then(() => {
        document.getElementById('hideautomatic').click();
        autoSubmitButton.disabled = false;
        autoSubmitButton.textContent = "Search Again";

      });

      return;
    }

    await checkUniversityEligibility(eligibilityData);

  } catch (error) {
    autoSubmitButton.disabled = false;
    autoSubmitButton.textContent = "Search Again";
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Something went wrong!'
    });
  }
  autoSubmitButton.disabled = false;
  autoSubmitButton.textContent = "Search Again";
}

async function handleManualSubmit(formData) {
  const manualSubmitButton = document.getElementById("manualsubbtn");
  manualSubmitButton.disabled = true;
  manualSubmitButton.textContent = "Processing...";

  const manualData = {
    sscGPA: parseFloat(formData.get('sscGPA')),
    hscGPA: parseFloat(formData.get('hscGPA')),
    physicsGPA: parseFloat(formData.get('physicsGPA')),
    chemistryGPA: parseFloat(formData.get('chemistryGPA')),
    mathGPA: parseFloat(formData.get('mathGPA')),
    biologyGPA: parseFloat(formData.get('biologyGPA')),
    englishGPA: parseFloat(formData.get('englishGPA')),
    ictGPA: parseFloat(formData.get('ictGPA')),
    banglaGPA: parseFloat(formData.get('banglaGPA')),
    secondTimer: "no",
    sscYear: formData.get('sscYear'),
    hscYear: formData.get('hscYear'),
  };

  await checkUniversityEligibility(manualData);
  manualSubmitButton.disabled = false;
  manualSubmitButton.textContent = "Search Again";
}

autoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  await handleAutoSubmit(formData);
});

manualForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  handleManualSubmit(formData);
});



function getEligibilityStyles(uni) {
  return 'shadow-xl rounded-xl';
}

function getCategoryBadgeStyle(category) {
  switch (category.toLowerCase()) {
    case 'public':
      return 'bg-green-100 text-green-800';
    case 'medical':
      return 'bg-red-100 text-red-800';
    case 'engineering':
      return 'bg-blue-100 text-blue-800';
    case 'private':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function checkUniversityEligibility(formData) {
  try {
    const response = await fetch('https://api.varsity.aparsclassroom.com/api/v1/check-eligibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (data.success) {
      displayUniversityCards(data.data, data.meta);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message || 'Something went wrong!'
    });
  }
}

function getCountdown(examDate) {
  const now = new Date().getTime();
  const examTime = new Date(examDate).getTime();
  const distance = examTime - now;

  if (distance < 0) {
    return 'Exam has ended';
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} days, ${hours} hours, ${minutes} minutes`;
}

function displayUniversityCards(universities, courses) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = `
    <div class="max-w-7xl mx-auto p-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-2 text-center bangla">
      আবেদন যোগ্য বিশ্ববিদ্যালয়সমূহ
      </h2>
      <p class="text-gray-600 text-center mb-8 max-w-2xl mx-auto bangla">
        তুমি ${universities.length} টি বিশ্ববিদ্যালয়ে আবেদন করতে পারবে, আবেদন সময়সীমা মিস করো না!
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        ${universities.map(uni => `
          <div class="uni-card rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
            
            <div class="relative">
                <h3 class="text-xl font-semibold p-4">
                   ${uni.university_name}
                </h3>
            </div>
            <hr/>

            <div class="p-6 space-y-2">
              ${uni.admission_type ? `<div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600"> Exam Type:</span>
                  <span class="font-semibold text-gray-900">${uni.admission_type}</span>
                </div>` : ''}

                ${uni.total_seats ? `<div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600"> Total Seats: </span>
                  <span class="font-semibold text-gray-900">${uni.total_seats}</span>
                </div>` : ''}
              
                 ${uni.apply_start_date ? `
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Application Starts:</span>
                  <span class="font-semibold text-gray-900">${formatDate(uni.apply_start_date)}</span>
                </div>
              ` : ''}
              ${uni.apply_end_date ? `
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Application Ends:</span>
                  <span class="font-semibold text-gray-900">${formatDate(uni.apply_end_date)}</span>
                </div>
              ` : ''}
              ${uni.exam_date ? `
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Exam Date:</span>
                  <span class="font-semibold text-blue-600">${formatDate(uni.exam_date)}</span>
                </div>
                <div class="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                  <span class="text-gray-600">Time remaining till exam:</span>
                  <span class="font-semibold text-blue-600">${calculateDaysLeft(uni.exam_date)} days left</span>
                </div>
              ` : ''}

              ${uni.apply_link ? `<div class="pt-2">
                <a href="${uni.apply_link}" target="_blank"
                   class="block w-full text-white font-semibold px-4 py-2 rounded-xl bg-blue-400 hover:bg-blue-500 no-underline shadow-lg hover:no-underline text-center group">
                  <span class="flex items-center justify-center">
                    Apply Now
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </span>
                </a>
              </div>` : `
                  <div class="pt-2">
              <button disabled
                class="block w-full font-semibold px-4 py-2 rounded-xl bg-gray-200 cursor-not-allowed text-center">
                Application Link Not Published
               </button>
            </div>
              ` }

            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ${courses.length > 0 ? `
        <div class=" max-w-7xl mx-auto p-6">
          <h2 class="text-3xl font-bold text-gray-900 mb-2 text-center bangla">
            তোমার জন্য রেকমেন্ডেড কোর্সসমূহ
          </h2>
          <br />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${courses.map(course => `
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="aspect-w-16 aspect-h-9">
                  <img 
                    src="${course.ProductImage}" 
                    alt="${course.productFullName}"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-lg mb-2 text-gray-900">
                    ${course.productFullName}
                  </h3>
                  <a 
                    href="${course.Permalink}" 
                    target="_blank"
                    class="block w-full text-center hover:no-underline bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    View Course Details
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
  `;
  resultsContainer.classList.remove('hidden');
  resultsContainer.scrollIntoView({ behavior: 'smooth' });
  startCountdowns();
}


function startCountdowns() {
  setInterval(() => {
    document.querySelectorAll('[data-exam-date]').forEach(element => {
      const examDate = element.getAttribute('data-exam-date');
      element.textContent = getCountdown(examDate);
    });
  }, 60000);
}

const autoBtn = document.getElementById("hidemanual");
const manualBtn = document.getElementById("hideautomatic");

function setActive(activeBtn, inactiveBtn) {
  activeBtn.style.backgroundColor = "#007BFF";
  activeBtn.style.color = "white";
  inactiveBtn.style.backgroundColor = "#D3D3D3";
  inactiveBtn.style.color = "black";
}

autoBtn.addEventListener("click", () => {
  autoForm.style.display = "block";
  manualForm.style.display = "none";
  setActive(autoBtn, manualBtn);
});

manualBtn.addEventListener("click", () => {
  autoForm.style.display = "none";
  manualForm.style.display = "block";
  setActive(manualBtn, autoBtn);
});

setActive(autoBtn, manualBtn);

//table related code
const toggleButtons = document.querySelectorAll(".toggle-btn");
const tableHeaders = document.getElementById("table-headers");
const tableBody = document.getElementById("table-body");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

let activeTab = "general";
let currentPage = 1;
const rowsPerPage = 5;
let tableData = [];

const fieldMapping = {
  "general": ["university_name", "2nd_timer_allowed", "calculator_allowed", "negative_marking"],
  "exam-type": ["university_name", "admission_type", "mcq_subject_bsed_quantity", "written_subjec_based_quantity"],
  "application-start": ["university_name", "apply_start_date"],
  "apply-options": ["university_name", "apply_start_date", "apply_end_date", "total_seats", "apply_link"],
  "admit": ["university_name", "admit_download_date"],
  "exam-options": ["university_name", "exam_date"],
  "result": ["university_name", "result_publish_date"]
};

function calculateDaysLeft(dateStr) {
  if (!dateStr) return "Not available";
  const today = new Date();
  const target = new Date(dateStr);
  const diff = target - today;
  return diff >= 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0;
}

function renderTable() {
  const fields = fieldMapping[activeTab];
  tableHeaders.innerHTML = "";
  tableBody.innerHTML = "";

  // render headers
  fields.forEach(f => {
    const th = document.createElement("th");
    th.className = "px-4 py-2 border";
    if (f === "mcq_subject_bsed_quantity") {
      th.innerText = "MCQ Breakdown";
    }
    else if (f === "written_subjec_based_quantity") {
      th.innerText = "Written Breakdown";
    }
    else if (f === "university_name") {
      th.innerText = "Exam Name";
    }
    else if (f === "apply_start_date") {
      th.innerText = "Application Start";
    }
    else if (f === "apply_end_date") {
      th.innerText = "Application End";
    }
    else if (f === "2nd_timer_allowed") {
      th.innerText = "2nd Timer Allowed";
    }
    else if (f === "calculator_allowed") {
      th.innerText = "Calculator Allowed";
    }
    else if (f === "negative_marking") {
      th.innerText = "Negative Marking";
    }
    else if (f === "admission_type") {
      th.innerText = "Question";
    }
    else if (f === "total_seats") {
      th.innerText = "Total Seats";
    }
    else if (f === "admit_download_date") {
      th.innerText = "Admit Card Download";
    }
    else if (f === "exam_date") {
      th.innerText = "Exam Date";
    }
    else if (f === "result_publish_date") {
      th.innerText = "Result";
    }
    else {
      th.innerText = f.replace(/_/g, " ").toUpperCase();
    }
    tableHeaders.appendChild(th);
  });

  const hasDateField = fields.some(f => f.toLowerCase().includes("date"));
  if (hasDateField) {
    const th = document.createElement("th");
    th.className = "px-4 py-2 border";
    th.innerText = "Time Left";
    tableHeaders.appendChild(th);
  }

  // pagination
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = tableData.slice(start, end);

  // render rows
  pageData.forEach(item => {
    const tr = document.createElement("tr");
    let dateValue = null;

    fields.forEach(f => {
      const td = document.createElement("td");
      td.className = "px-4 py-2 border";

      if (f.toLowerCase().includes("date")) {
        dateValue = item[f];
        td.innerText = item[f] || "Not available";
      } else if (f === "apply_link") {
        const link = item[f] && item[f].trim() !== ""
          ? item[f]
          : `https://www.google.com/search?q=${encodeURIComponent(item.university_name)}`;

        td.innerHTML = `<a href="${link}" target="_blank" class="text-blue-500 underline">Link</a>`;
      } else {
        td.innerText = item[f] || "No information available";
      }
      tr.appendChild(td);
    });

    if (hasDateField) {
      const td = document.createElement("td");
      td.className = "px-4 py-2 border";
      if (dateValue) {
        const today = new Date();
        const target = new Date(dateValue);
        const diff = target - today;
        if (diff >= 0) {
          const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
          td.innerText = `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
        } else {
          td.innerText = "Already started";
        }
      } else {
        td.innerText = "Not available";
      }
      tr.appendChild(td);
    }


    tableBody.appendChild(tr);
  });

  pageInfo.innerText = `Page ${currentPage} / ${Math.ceil(tableData.length / rowsPerPage)}`;
}


toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activeTab = btn.dataset.tab;
    toggleButtons.forEach(b => {
      b.classList.remove("bg-blue-500", "text-white");
      b.classList.add("bg-gray-200");
    });
    btn.classList.add("bg-blue-500", "text-white");
    btn.classList.remove("bg-gray-200");
    currentPage = 1;
    renderTable();
  });
});


prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});
nextPageBtn.addEventListener("click", () => {
  if (currentPage < Math.ceil(tableData.length / rowsPerPage)) {
    currentPage++;
    renderTable();
  }
});

// <div class="flex items-center text-orange-800 font-semibold text-sm mb-3">
//   <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
//   Minimum Requirements
// </div>
// <div class="grid grid-cols-2 gap-3 text-sm">
//   <div class="text-center bg-white rounded-lg p-3 border border-orange-100">
//     <div class="text-xs text-orange-600 font-medium mb-1">SSC GPA</div>
//     <div class="text-lg font-bold text-orange-700">${uni.minimum_ssc_gpa}</div>
//   </div>
//   <div class="text-center bg-white rounded-lg p-3 border border-orange-100">
//     <div class="text-xs text-orange-600 font-medium mb-1">HSC GPA</div>
//     <div class="text-lg font-bold text-orange-700">${uni.minimum_hsc_gpa}</div>
//   </div>
// </div>

//          {
//     "productId": "560",
//     "productName": "medical26",
//     "productFullName": "ACS pre-medical batch 2026",
//     "ProductImage": "https://i.ibb.co/ndw2g50/Advance-Pre-Medical-Batch-HSC-26-t-1.jpg",
//     "Permalink": "https://aparsclassroom.com/shop/admission/HSC_26/PreMedical/"
// },