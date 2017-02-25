$(document).ready(function () {
    // Options status
    function checkSwitch1() {
        if ( $('#switch-1:checked').length>0 ) {
            $('.quote-off').hide();
            $('.quote-on').show();
        } else {
            $('.quote-on').hide();
            $('.quote-off').show();
        }
    }
    function checkSwitch2() {
        if ( $('#switch-2:checked').length>0 ) {
            $('.author-off').hide();
            $('.author-on').show();
        } else {
            $('.author-on').hide();
            $('.author-off').show();
        }
    }
    checkSwitch1();
    checkSwitch2();

    // Options switches
    $('#switch-1').click(function(){
        checkSwitch1();
    })
    $('#switch-2').click(function(){
        checkSwitch2();
    })

    // Saves options to chrome.storage
    function save_options() {
        var quoteState = $('#switch-1:checked').length>0
        var authorState = $('#switch-2:checked').length>0
        chrome.storage.sync.set({
            'quoteAnimation': quoteState,
            'authorAnimation': authorState
        }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
        });
    }
    document.getElementById('save').addEventListener('click', save_options);
});