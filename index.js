const header = document.querySelector('header');
const sidebar = document.querySelector('nav.sidebar');
const content = document.querySelector('article.content');
const photo_holder = document.querySelector('article.photo_holder');

const logo = header.querySelector('.icon');
const dropdown = header.querySelector('.dropdown');

const profile = content.querySelector('.profile');
const card = profile.querySelector('.card');
const card_icon = card.querySelector('.icon');
const card_name = card.querySelector('.card_name');
const card_bio = card.querySelector('.card_bio');
const social = profile.querySelector('.social');

const videos = content.querySelector('.videos');
const video_scroll = videos.querySelector('.video_scroll');
const grid = content.querySelector('section.grid');

const profile_button = sidebar.querySelector('button.top');

const photo_figure = photo_holder.querySelector('figure');
const photo_info = photo_figure.querySelector('.info');
const photo_date = photo_info.querySelector('.date');
const photo_featured = photo_info.querySelector('.people');
const photo_caption = photo_figure.querySelector('figcaption');
const photo_back = photo_figure.querySelector('.shift.left');
const photo_next = photo_figure.querySelector('.shift.right');
const photo_close = photo_figure.querySelector('.close');

const photo_aside = photo_holder.querySelector('aside');
const photo_header = photo_aside.querySelector('.photo_header');
const photo_header_span = photo_header.querySelector('span');
const photo_header_close = photo_header.querySelector('.close');

let selected_user = Object.keys(data)[0];

function openPhoto(event) {
    if (event.which != 1) { return; }
    let date = event.target.getAttribute('date');
    if (!date) { return; }
    let directory = data[selected_user].images[date];
    photoHolderClean(event.target.parentElement.parentElement.classList.contains('location'));

    for (var i = 0; i < directory.id.length; i++) {
        let id = directory.id[i];
        let img = document.createElement('img');
        let url = `media/${selected_user}/IMG_${id}.jpg`;
        img.setAttribute('src', url);
        img.classList.toggle('post', i != 0);
        photo_figure.insertBefore(img, photo_info);
    }

    findMatchingLocations(date);
    findMatchingFriends(date);
    findMatchingMonth(date);

    photo_date.textContent = date;
    !directory.people 
        ? photo_featured.classList.add('hide')
        : photo_featured.textContent = directory.people.join(', ');
    photo_caption.textContent = directory.name;
    photo_header_span.textContent = directory.name;
    photo_holder.classList.remove('hide');
    grid.blur();
    photo_holder.focus();
}

function closePhoto() {
    photo_holder.classList.add('hide');
}

function createRelatedFrame(name) {
    let frame = document.createElement('div');
    let h1 = document.createElement('h1');
    let scroll = document.createElement('div');

    frame.classList.add('related');
    scroll.classList.add('related_scroll');
    frame.appendChild(h1);
    frame.appendChild(scroll);
    photo_aside.appendChild(frame);

    return scroll;
}

function findMatchingLocations(this_date) {
    let related_frame = photo_aside.querySelector('.related.location');
    if (related_frame) {
        related_frame.querySelector('.hide')?.classList.remove('hide');
        related_frame.querySelector(`figure[date="${this_date}"]`)?.classList.add('hide');
        return;
    }
    let directory = data[selected_user].images;
    let this_photo = directory[this_date];
    let frame = createRelatedFrame(this_photo.name);
    let frame_name = frame.previousElementSibling;
    frame_name.textContent = this_photo.name;
    frame.parentElement.classList.add('location');

    for (var date in directory) {
        let entry = directory[date];
        if (entry.name != this_photo.name) { continue; }
        let fig = loadFigure(date, frame).parentElement;
        if (date == this_date) {
            fig.classList.add('hide');
        }
    }

    if (!frame.querySelector('figure')) {
        frame.parentElement.remove();
    }
}

function findMatchingMonth(this_date) {
    let directory = data[selected_user].images;
    let this_photo = directory[this_date];
    let frame = createRelatedFrame(this_photo.name);
    let frame_name = frame.previousElementSibling;
    frame_name.textContent = 'This Month';

    let date_split = this_date.split('/');

    for (var date in directory) {
        if (date == this_date) { continue; }
        let new_split = date.split('/');
        if (date_split[0] != new_split[0]) { continue; }
        if (date_split[2] != new_split[2]) { continue; }
        loadFigure(date, frame);
    }

    if (!frame.querySelector('figure')) {
        frame.parentElement.remove();
    }
}

function findMatchingFriends(this_date) {
    let directory = data[selected_user].images;
    let this_photo = directory[this_date];
    if (!this_photo.people) { return; }

    for (var i = 0; i < this_photo.people.length; i++) {
        let person = this_photo.people[i];
        let frame = createRelatedFrame(this_photo.name);
        let frame_name = frame.previousElementSibling;
        frame_name.textContent = `With ${person}`;

        for (var date in directory) {
            if (date == this_date) { continue; }
            let entry = directory[date];
            if (!entry.people) { continue; }
            if (!entry.people.includes(person)) { continue; }
            loadFigure(date, frame);
        }

        if (!frame.querySelector('figure')) {
            frame.parentElement.remove();
        }
    }
}

function handlePhotoBack() {
    let new_index = parseInt(photo_figure.getAttribute('index')) - 1;
    handleButtonIndex(new_index);
}

function handlePhotoNext() {
    let new_index = parseInt(photo_figure.getAttribute('index')) + 1;
    handleButtonIndex(new_index);
}

function handleButtonIndex(index) {
    let images = photo_figure.querySelectorAll('img');
    let target = images[index];
    target.classList.remove('pre');
    target.classList.remove('post');

    for (var i = 0; i < images.length; i++) {
        if (i == index) { continue; }
        let this_img = images[i];
        this_img.removeAttribute('class');
        this_img.classList.add(i < index ? 'pre' : 'post');
    }

    photo_back.classList.toggle('hide', index == 0);
    photo_next.classList.toggle('hide', index == images.length - 1);
    photo_figure.setAttribute('index', index);
}

function loadProfile() {
    let directory = data[selected_user];
    card_icon.style.backgroundImage = `url(icon/user/${directory.card.icon})`;
    card_name.textContent = selected_user;
    card_bio.textContent = directory.card.bio;

    for (var name in directory.social) {
        let link_value = directory.social[name];
        let social_link = document.createElement('a');
        let social_button = document.createElement('button');
        social_button.classList.add(name);
        social_link.setAttribute('href', link_value);
        social_link.setAttribute('target', '_blank');
        social_link.appendChild(social_button);
        social.appendChild(social_link);
    }

    loadDropdown();
    loadSidebar();
    loadVideos();
    loadFeatured();
    content.setAttribute('segment', 0);
    loadContentSegment(0);
}

function loadSidebar() {
    let directory = data[selected_user].images;
    let counts = {};

    for (var date in directory) {
        let split = date.split('/');
        let month_key = `${split[0]}/${split[2]}`;
        !counts[month_key] ? counts[month_key] = 1 : counts[month_key]++;
    }
    for (var month_key in counts) {
        let split = month_key.split('/');
        !sidebar.querySelector(`hr[year="20${split[1]}`)
            ? makeYearSplitter(split[1])
            : undefined;
        makeMonthEntry(counts[month_key], split[0], split[1]);
    }

    function makeYearSplitter(year) {
        let hr = document.createElement('hr');
        hr.setAttribute('year', `20${year}`);
        sidebar.appendChild(hr);
    }

    function makeMonthEntry(count, month, year) {
        let all_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month_string = all_month[parseInt(month) - 1];
        let entry = document.createElement('button');
        entry.textContent = `${month_string} (${count})`;
        entry.classList.add('month');
        entry.setAttribute('month', month);
        entry.setAttribute('year', `20${year}`);
        entry.addEventListener('mouseup', findMonth);
        sidebar.appendChild(entry);
    }
}

function findMonth(event) {
    let directory = Object.keys(data[selected_user].images).reverse();
    let month = event.target.getAttribute('month');
    let year = event.target.getAttribute('year')?.slice(-2);
    if (!month || !year) { return; }

    let target_date;
    for (var i = 0; i < directory.length; i++) {
        let date = directory[i];
        let split = date.split('/');
        if (split.shift() != month || split.pop() != year) { continue; }
        target_date = date;
    }

    function search() {
        let entry = grid.querySelector(`figure[date="${target_date}"]`);
        if (!entry) {
            nextContentSegment();
            search();
            return;
        }
        handleMobileShift();
        entry.classList.add('highlight');
        entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { entry.classList.remove('highlight') }, 500);
    }
    search();
}

function loadVideos() {
    let directory = data[selected_user];
    videos.classList.toggle('hide', !directory.videos);
    if (!directory.videos) { return; }

    for (var i = directory.videos.length - 1; i >= 0; i--) {
        let video_data = directory.videos[i];
        loadVideoFigure(video_data);
    }
}

function loadVideoFigure(data) {
    let video_link = document.createElement('a');
    let video_figure = document.createElement('figure');
    let image = document.createElement('img');
    let caption = document.createElement('figcaption');
    let date_holder = document.createElement('div');

    video_figure.classList.add('video');
    video_link.setAttribute('href', data.link);
    video_link.setAttribute('target', '_blank');
    caption.textContent = data.name;
    date_holder.textContent = data.date;
    image.setAttribute('loading', 'lazy');
    image.setAttribute('src', `icon/thumbnail/${data.thumbnail}`);

    video_figure.appendChild(image);
    video_figure.appendChild(date_holder);
    video_figure.appendChild(caption);
    video_link.appendChild(video_figure);
    video_scroll.appendChild(video_link);
}

function loadFigure(date, parent) {
    let photo_directory = data[selected_user].images[date];
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    let caption = document.createElement('figcaption');
    let date_holder = document.createElement('div');

    image.onload = function () {
        figure.classList.add('loaded');
    };

    figure.setAttribute('date', date);
    figure.classList.toggle('featured', photo_directory.featured != null);
    caption.textContent = photo_directory.name;
    date_holder.textContent = date;
    image.setAttribute('loading', 'lazy');
    image.setAttribute('src', `media/${selected_user}/IMG_${photo_directory.id[0]}.jpg`);
    date_holder.classList.add('date');

    figure.addEventListener('mouseup', openPhoto);
    figure.appendChild(image);
    figure.appendChild(date_holder);
    figure.appendChild(caption);
    parent.appendChild(figure);

    return figure;
}

function loadFeatured() {
    let directory = data[selected_user];
    let image_keys = Object.keys(directory.images);
    for (var i = 0; i < image_keys.length; i++) {
        let date = image_keys[i];
        let info = directory.images[date];

        if (!info.featured) { continue; }
        let figure = loadFigure(date, grid);
        figure.style.order = -info.featured;
    }
}

function loadContentSegment(index) {
    let directory = data[selected_user];
    let image_keys = Object.keys(directory.images);
    for (var i = index * 9; i < (index + 1) * 9; i++) {
        if (i >= image_keys.length) { break; }
        let date = image_keys[i];
        let info = directory.images[date];
        if (info.featured) { continue; }
        loadFigure(date, grid);
    }
}

function nextContentSegment() {
    let new_segment = parseInt(content.getAttribute('segment')) + 1;
    content.setAttribute('segment', new_segment);
    loadContentSegment(new_segment);
}

function handlePageScroll() {
    if (content.scrollTop + content.clientHeight < content.scrollHeight - 1) { return; }
    nextContentSegment();
}

function loadDropdown() {
    function createUser(name) {
        let user_data = data[name];
        let entry = document.createElement('div');
        let icon = document.createElement('div');
        let span = document.createElement('span');

        entry.classList.add('entry');
        entry.classList.toggle('select', name == selected_user);
        entry.setAttribute('user', name);
        icon.classList.add('icon');
        icon.style.backgroundImage = `url(icon/user/${user_data.card.icon})`;
        span.textContent = name;

        entry.addEventListener('mouseup', handleUserSelect);
        entry.appendChild(icon);
        entry.appendChild(span);
        dropdown.appendChild(entry);
    }


    let dropdown_users = dropdown.querySelectorAll('.entry');
    for (var i = 0; i < dropdown_users.length; i++) {
        let this_user = dropdown_users[i];
        this_user.remove();
    }

    let data_keys = Object.keys(data);
    for (var i = 0; i < data_keys.length; i++) {
        let name = data_keys[i];
        createUser(name);
    }
}

function handleUserSelect(event) {
    if (event.target.classList.contains('select')) { return; }
    let user = event.target.getAttribute('user');
    if (!user) { return; }
    dropdown.classList.remove('expand');
    handleClean();
    selected_user = user;
    loadProfile();
}

function handleDropdownToggle(event) {
    if (!event.target.classList.contains('select')) { return; }
    dropdown.classList.toggle('expand');
}

function handleContentShift() {
    document.body.classList.toggle('shift');
    if (window.innerWidth < 767 && document.body.classList.contains('shift')) {
        closePhoto();
    }
}

function pageScrollUp() {
    handleMobileShift();
    profile.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleMobileShift() {
    if (window.innerWidth > 767) { return; }
    document.body.classList.remove('shift');
}

function photoHolderClean(location) {
    let related_select = location ? '.related:not(.location)' : '.related';
    massRemove([
        ...photo_figure.querySelectorAll('img'),
        ...photo_aside.querySelectorAll(related_select),
    ]);

    photo_figure.setAttribute('index', 0);
    photo_back.classList.add('hide');
    photo_next.classList.remove('hide');
    photo_featured.classList.remove('hide');
    photo_date.textContent = '';
    photo_featured.textContent = '';
    photo_caption.textContent = '';
}

function handleClean() {
    massRemove([
        ...social.querySelectorAll('a'),
        ...video_scroll.querySelectorAll('a'),
        ...grid.querySelectorAll('figure'),
        ...sidebar.querySelectorAll('hr'),
        ...sidebar.querySelectorAll('.month:not(.top)')
    ]);

    photoHolderClean();
}

function massRemove(array) {
    for (var i = 0; i < array.length; i++) {
        let this_element = array[i];
        this_element.remove();
    }
}

loadProfile();
logo.addEventListener('mouseup', handleContentShift);
dropdown.addEventListener('mouseup', handleDropdownToggle);
profile_button.addEventListener('mouseup', pageScrollUp);
content.addEventListener('scroll', handlePageScroll);
photo_back.addEventListener('mouseup', handlePhotoBack);
photo_next.addEventListener('mouseup', handlePhotoNext);
photo_close.addEventListener('mouseup', closePhoto);
photo_header_close.addEventListener('mouseup', closePhoto);
