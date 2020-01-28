const arrayDuplicateRemover = function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
};

const navBarFiller = function (res) {
    const navBarLinks = [];
    if (res.locals.currentUser && res.locals.currentUser == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        console.log("user1:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/admin/makes', linkName: 'Makes' });
        navBarLinks.push({ hrefVal: '/admin/models', linkName: 'Models' });
        navBarLinks.push({ hrefVal: '/admin/manageVehicles/' + res.locals.currentUser, linkName: 'Vehicles' });
        navBarLinks.push({ hrefVal: '/admin/listScheduledTestDrives/' + res.locals.currentUser, linkName: 'Test Drives' });
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else if (res.locals.currentUser && res.locals.currentUser != '9953274d-da9b-49d1-bc02-ae91ce553561') {
        console.log("user2:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/admin/listScheduledTestDrives/' + res.locals.currentUser, linkName: 'Test Drives' });
        navBarLinks.push({ hrefVal: '/admin/manageVehicles/' + res.locals.currentUser, linkName: 'My Vehicles' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else {
        console.log("user3:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/register', linkName: 'Register' });
        navBarLinks.push({ hrefVal: '/users/login', linkName: 'Login' });
    };
    return navBarLinks;
};

const utils = { navBarFiller, arrayDuplicateRemover }

module.exports = utils