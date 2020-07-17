$(document).ready(() => {
    var $acceptedHITs = $('#approvedHITs');
    var $rejectedHITs = $('#rejectedHITs');
    var $desiredApproval = $('#desiredRating');
    var $resultText = $('#resultText');
    var $calcSubmit = $('#approvalRateCalcSubmit');
    $calcSubmit.on('click', (event) => {
        event.preventDefault();
        ah = parseInt($acceptedHITs.val().replace(/,/g, ''));
        if (isNaN(ah)) {
            $('#helpText1').text('Approved HITs must be a number.').removeClass('hidden');
            return;
        }
        rh = parseInt($rejectedHITs.val().replace(/,/g, ''));
        if (isNaN(rh)) {
            $('#helpText2').text('Rejected HITs must be a number.').removeClass('hidden');
            return;
        }
        da = parseFloat($desiredApproval.val().replace('%', '')) / 100;
        if (isNaN(da)) {
            $('#helpText3').text('Desired Rating must be a number or percentage.').removeClass('hidden');
            return;
        }
        nh = (ah - (ah * da) - (rh * da)) / (da - 1);
        if (Math.sign(nh) === -1 || Math.sign(Math.round(nh)) === 0) {
            $resultText.text('You already have a ' + $desiredApproval.val().replace('%', '') + '% approval rating!');
        } else {
            $resultText.text('You need ' + Math.round(nh) + ' more approved HITs to reach a ' + $desiredApproval.val().replace('%', '') + '% approval rating.');
        }
        $('.help').addClass('hidden');
    })
});