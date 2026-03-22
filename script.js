// ===== Sticky Header =====
// Show sticky header when user scrolls past the hero section
// Hide it when scrolling back up

var stickyHeader = document.getElementById('stickyHeader');
var hero = document.getElementById('hero');
var lastScrollY = 0;

window.addEventListener('scroll', function() {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var currentScroll = window.scrollY;

    if (currentScroll > heroBottom && currentScroll > lastScrollY) {
        // scrolling down past hero - show sticky
        stickyHeader.classList.add('visible');
    } else if (currentScroll < lastScrollY || currentScroll <= heroBottom) {
        // scrolling up or back in hero - hide sticky
        stickyHeader.classList.remove('visible');
    }

    lastScrollY = currentScroll;
});


// ===== Mobile Menu Toggle =====
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
});


// ===== Image Carousel (Hero) =====
// Click thumbnail to change main image

var mainImg = document.getElementById('mainCarouselImg');
var thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
        // update main image
        mainImg.src = this.getAttribute('data-full');

        // update active state
        thumbs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
    });
});

// Thumbnail scroll arrows
var thumbsTrack = document.getElementById('thumbsTrack');
var thumbLeft = document.getElementById('thumbLeft');
var thumbRight = document.getElementById('thumbRight');

thumbLeft.addEventListener('click', function() {
    thumbsTrack.scrollBy({ left: -160, behavior: 'smooth' });
});

thumbRight.addEventListener('click', function() {
    thumbsTrack.scrollBy({ left: 160, behavior: 'smooth' });
});


// ===== Zoom on Hover =====
// When hovering over the main carousel image, show a zoomed preview beside it

var carouselMain = document.querySelector('.carousel-main');
var zoomLens = document.getElementById('zoomLens');
var zoomPreview = document.getElementById('zoomPreview');

carouselMain.addEventListener('mouseenter', function() {
    // dont show zoom on small screens
    if (window.innerWidth < 992) return;
    zoomLens.style.display = 'block';
    zoomPreview.style.display = 'block';
    zoomPreview.style.backgroundImage = 'url(' + mainImg.src + ')';
});

carouselMain.addEventListener('mouseleave', function() {
    zoomLens.style.display = 'none';
    zoomPreview.style.display = 'none';
});

carouselMain.addEventListener('mousemove', function(e) {
    if (window.innerWidth < 992) return;

    var rect = carouselMain.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // position the lens
    var lensW = 120;
    var lensH = 120;
    var lensX = x - lensW / 2;
    var lensY = y - lensH / 2;

    // keep lens inside image bounds
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - lensW) lensX = rect.width - lensW;
    if (lensY > rect.height - lensH) lensY = rect.height - lensH;

    zoomLens.style.left = lensX + 'px';
    zoomLens.style.top = lensY + 'px';

    // calculate zoom ratio
    var zoomLevel = 2.5;
    var bgW = rect.width * zoomLevel;
    var bgH = rect.height * zoomLevel;

    var bgX = -(lensX * zoomLevel);
    var bgY = -(lensY * zoomLevel);

    zoomPreview.style.backgroundSize = bgW + 'px ' + bgH + 'px';
    zoomPreview.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
    zoomPreview.style.backgroundImage = 'url(' + mainImg.src + ')';
});


// ===== Technical Specs Tabs =====
var specTabs = document.querySelectorAll('.spec-tab');
var specsBody = document.getElementById('specsBody');

var specsData = {
    dimensions: [
        ['Outer Diameter Range', '20mm to 1600mm (3/4" to 63")'],
        ['Wall Thickness', '2.3mm to 90.2mm'],
        ['Standard Lengths', '6m, 12m, 50m, 100m coils'],
        ['Pressure Ratings', 'PN 2.5 to PN 25'],
        ['Tolerance', 'As per IS 4984 / ISO 4427'],
        ['SDR Range', 'SDR 7.4 to SDR 41']
    ],
    weight: [
        ['20mm PE100 PN16', '0.18 kg/m'],
        ['63mm PE100 PN10', '1.15 kg/m'],
        ['110mm PE100 PN16', '5.10 kg/m'],
        ['315mm PE100 PN10', '11.6 kg/m'],
        ['500mm PE100 PN10', '29.2 kg/m'],
        ['Coil Weight (100m)', 'Varies by diameter']
    ],
    pressure: [
        ['PN 2.5', 'Gravity flow applications'],
        ['PN 6', 'Low pressure irrigation'],
        ['PN 10', 'Water distribution mains'],
        ['PN 16', 'High pressure water supply'],
        ['PN 20', 'Industrial applications'],
        ['PN 25', 'Mining & slurry transport']
    ],
    temperature: [
        ['Operating Range', '-40°C to +60°C'],
        ['Optimal Performance', '0°C to 40°C'],
        ['Maximum Continuous', '60°C (with derating)'],
        ['Brittleness Point', 'Below -70°C'],
        ['Welding Temperature', '200°C to 220°C'],
        ['Storage', '-20°C to +50°C recommended']
    ]
};

function renderSpecs(tab) {
    var data = specsData[tab];
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<tr><td>' + data[i][0] + '</td><td>' + data[i][1] + '</td></tr>';
    }
    specsBody.innerHTML = html;
}

// initial render
renderSpecs('dimensions');

specTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        specTabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderSpecs(this.getAttribute('data-tab'));
    });
});


// ===== FAQ Accordion =====
var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function() {
        // close others
        faqItems.forEach(function(other) {
            if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
    });
});


// ===== Manufacturing Process Tabs =====
var processTabs = document.querySelectorAll('.process-tab');
var processTitle = document.getElementById('processTitle');
var processDesc = document.getElementById('processDesc');
var processList = document.getElementById('processList');
var processImg = document.getElementById('processImg');

var processData = {
    raw: {
        title: 'High-Grade Raw Material Selection',
        desc: 'Starts by using only premium-grade, virgin HDPE resin sourced from globally certified suppliers with strict quality controls.',
        points: ['PE100 grade resin', 'Certified material traceability'],
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=350&fit=crop'
    },
    extrusion: {
        title: 'Precision Extrusion Process',
        desc: 'Our single-screw extruders melt and shape the HDPE resin into pipes with precise wall thickness and diameter control.',
        points: ['Temperature controlled zones', 'Consistent melt flow rate'],
        img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&h=350&fit=crop'
    },
    cooling: {
        title: 'Controlled Cooling System',
        desc: 'Vacuum sizing and spray cooling tanks ensure dimensional accuracy and optimal crystalline structure.',
        points: ['Vacuum calibration sizing', 'Multi-stage spray cooling'],
        img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500&h=350&fit=crop'
    },
    testing: {
        title: 'Rigorous Quality Testing',
        desc: 'Every batch undergoes hydrostatic pressure testing, dimensional checks, and material property verification.',
        points: ['Hydrostatic pressure test', 'Tensile strength verification'],
        img: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=500&h=350&fit=crop'
    },
    cutting: {
        title: 'Automated Cutting & Sizing',
        desc: 'Planetary saws cut pipes to exact lengths with clean, burr-free edges ready for joining.',
        points: ['Programmable cut lengths', 'Burr-free finish'],
        img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&h=350&fit=crop'
    },
    marking: {
        title: 'Inkjet Marking & Traceability',
        desc: 'Each pipe is marked with size, pressure rating, material grade, production date and batch number.',
        points: ['Full batch traceability', 'IS/ISO standard marking'],
        img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=350&fit=crop'
    },
    coiling: {
        title: 'Coiling & Packaging',
        desc: 'Smaller diameter pipes are coiled for easy transport. All products are securely packaged for safe delivery.',
        points: ['Automated coiling machines', 'Protective packaging'],
        img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=500&h=350&fit=crop'
    }
};

processTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        processTabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        var key = this.getAttribute('data-process');
        var data = processData[key];

        processTitle.textContent = data.title;
        processDesc.textContent = data.desc;
        processImg.src = data.img;

        var listHtml = '';
        for (var i = 0; i < data.points.length; i++) {
            listHtml += '<li>' + data.points[i] + '</li>';
        }
        processList.innerHTML = listHtml;
    });
});
