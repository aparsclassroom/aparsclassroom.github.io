const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4IRDcL90njhY24I2yXGGfDkBpwn8oDhiDHvzFVHfpGwwDDQrGPW2PRAmI8Mzp2POj_g/exec';

let originalPricing = {
  productCode: productCode,
  pls: pls,
  fix: fix
};

let isPhysicsHuntersStudent = false;

function showPhoneVerificationModal() {
  console.log(document.getElementById('cupon').value);
  if (!document.getElementById('cupon').value) {
    swal({
      title: 'Physics Hunters paid batch student verification',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Enter your phone number (01XX XXX XXXX)',
          type: 'tel',
          pattern: '^(?:\\+?88)?01[13-9]\\d{8}$',
          id: 'physicsHuntersPhone'
        }
      },
      buttons: {
        cancel: 'Cancel',
        verify: {
          text: 'Verify',
          value: 'verify'
        }
      }
    }).then(async (value) => {
      if (value === 'verify') {
        const phoneNumber = document.getElementById('physicsHuntersPhone').value.trim();

        if (phoneNumber.startsWith('+88') || phoneNumber.startsWith('88')) {
          swal({
            title: 'Invalid Number',
            text: 'Please enter the number without country code (e.g., 017XXXXXXXX).',
            icon: 'error',
            button: 'Ok'
          });
          return;
        }

        const phoneRegex = /^01[0-9]\d{8}$/;

        if (!phoneNumber) {
          swal({
            title: 'Error',
            text: 'Please enter your phone number',
            icon: 'error',
            button: 'Ok'
          });
          return;
        }

        if (!phoneRegex.test(phoneNumber)) {
          swal({
            title: 'Invalid Number',
            text: 'Phone number must contain 11 digits',
            icon: 'error',
            button: 'Ok'
          });
          return;
        }

        // Show loading state
        swal({
          title: 'Verifying...',
          text: 'Please wait while we verify your information',
          icon: 'info',
          buttons: false,
          closeOnClickOutside: false,
          closeOnEsc: false
        });

        const result = await verifyPhoneNumber(phoneNumber);

        if (result.found) {
          isPhysicsHuntersStudent = true;
          document.getElementById('cpninfo').style.display = 'none';
          document.getElementById('app').style.display = 'none';
          document.getElementById('cup').style.display = 'none';

          // Update pricing for Physics Hunters students
          updatePricingForPhysicsHunters(result);

          const contentDiv = document.createElement('div');

          contentDiv.innerHTML = `
        <p>Congratulations <strong>${result.name}</strong>!</p>
        <p>You've been verified as a Physics Hunters paid batch student.</p>
        <p style="color: green; font-weight: bold;">Special student discount applied!</p>
    `;

          swal({
            title: 'Verification Successful! 🎉',
            content: contentDiv,
            icon: 'success',
            button: 'Continue'
          });
        } else {
          isPhysicsHuntersStudent = false;
          swal({
            title: 'Verification Failed',
            text: 'Your phone number was not found in our Physics Hunters student list.',
            icon: 'warning',
            button: 'Ok'
          });
        }
      }
    });
  } else {
    swal({
      title: 'Please remove coupon to apply special discount',
      text: 'Coupon and Physics Hunters discount cannot be applied at the same time!',
      icon: 'error',
      button: 'Ok',
    }).then(() => {
      // Refresh the page when modal closes
      window.location.reload();
    });

  }
}

async function verifyPhoneNumber(phoneNumber) {
  try {
    const url = `${APPSCRIPT_URL}?phone=${encodeURIComponent(phoneNumber)}`;
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    const result = await response.json();
    //console.log(result);

    if (!result.success) throw new Error(result.message);

    return result;
  } catch (error) {
    //console.error('Verification error:', error);
    swal({
      title: 'Error',
      text: 'Could not verify at this moment. Please try again.',
      icon: 'error',
      button: 'Ok'
    });
    return { found: false };
  }
}

function updatePricingForPhysicsHunters(priceData) {
  productCode = priceData.productCode;
  pls = 1050;
  fix = 2000;

  document.getElementById('prevP').innerText = fix;
  document.getElementById('nop').innerText = pls;
  document.getElementById('sprice').innerText = pls;
  document.getElementById('price').value = pls;

  const btn = document.getElementById('physicsHuntersBtn');
  btn.classList.remove('btn-outline-info');
  btn.classList.add('btn-success');
  btn.innerHTML = 'Verified Physics Hunters Student ✓';
  btn.disabled = true;

  const discountPercent = Math.round(((fix - pls) / fix) * 100);
  const discountInfo = document.createElement('p');
  discountInfo.id = 'physicsHuntersDiscount';
  discountInfo.style.cssText = 'color: green; margin-top: 10px; text-align: center;';
  discountInfo.innerHTML = `Physics Hunters Student Discount: ${discountPercent}% OFF`;

  const priceSection = document.getElementById('clprc');
  if (!document.getElementById('physicsHuntersDiscount')) {
    priceSection.appendChild(discountInfo);
  }
}

function resetPricing() {
  productCode = originalPricing.productCode;
  pls = originalPricing.pls;
  fix = originalPricing.fix;

  document.getElementById('prevP').innerText = fix;
  document.getElementById('nop').innerText = pls;
  document.getElementById('sprice').innerText = pls;
  document.getElementById('price').value = pls;

  const btn = document.getElementById('physicsHuntersBtn');
  btn.classList.remove('btn-success');
  btn.classList.add('btn-outline-info');
  btn.innerHTML = 'Are you a Physics Hunters Student?';
  btn.disabled = false;

  const discountInfo = document.getElementById('physicsHuntersDiscount');
  if (discountInfo) {
    discountInfo.remove();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const physicsHuntersBtn = document.getElementById('physicsHuntersBtn');
  if (physicsHuntersBtn) {
    physicsHuntersBtn.addEventListener('click', showPhoneVerificationModal);
  }
});
