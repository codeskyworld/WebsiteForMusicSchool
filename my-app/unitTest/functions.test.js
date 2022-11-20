const userFunctions = require('./userFunctions');
const courseFunctions = require('./courseFunctions');
const gigFunctions = require('./gigFunctions');
const courseBookingFunctions = require('./courseBookingFunctions');
const gigBookingFunctions = require('./gigBookingFunctions');
const messageFunctions = require('./messageFunctions');


//test for user manipulation
test('add user test', async () => {
  expect.assertions(1);
  const data = await userFunctions.addUser();
  expect(data).toEqual(true);
});

test('get user test', async () => {
  expect.assertions(1);
  const data = await userFunctions.getUser();
  expect(data).toEqual(true);
});

test('update user test', async () => {
  expect.assertions(1);
  const data = await userFunctions.updateUser();
  expect(data).toEqual(true);
});

test('delete user test', async () => {
  expect.assertions(1);
  const data = await userFunctions.deleteUser();
  expect(data).toEqual(true);
});


//test for course manipulation
test('add course test', async () => {
  expect.assertions(1);
  const data = await courseFunctions.addCourse();
  expect(data).toEqual(true);
});

test('update user test', async () => {
  expect.assertions(1);
  const data = await courseFunctions.updateCourse();
  expect(data).toEqual(true);
});

test('get course test', async () => {
  expect.assertions(1);
  const data = await courseFunctions.getCourse();
  expect(data).toEqual(true);
});

test('delete course test', async () => {
  expect.assertions(1);
  const data = await courseFunctions.deleteCourse();
  expect(data).toEqual(true);
});




//test for gig manipulation
test('add gig test', async () => {
  expect.assertions(1);
  const data = await gigFunctions.addGig();
  expect(data).toEqual(true);
});

test('get gig test', async () => {
  expect.assertions(1);
  const data = await gigFunctions.getGig();
  expect(data).toEqual(true);
});

test('update gig test', async () => {
  expect.assertions(1);
  const data = await gigFunctions.updateGig();
  expect(data).toEqual(true);
});

test('delete gig test', async () => {
  expect.assertions(1);
  const data = await gigFunctions.deleteGig();
  expect(data).toEqual(true);
});

//test for course booking manipulation
test('add course booking test', async () => {
  expect.assertions(1);
  const data = await courseBookingFunctions.addCourseBooking();
  expect(data).toEqual(true);
});

test('get course booking test', async () => {
  expect.assertions(1);
  const data = await courseBookingFunctions.getCourseBooking();
  expect(data).toEqual(true);
});

test('delete course booking test', async () => {
  expect.assertions(1);
  const data = await courseBookingFunctions.deleteCourseBooking();
  expect(data).toEqual(true);
});

//test for gig booking manipulation
test('add gig booking test', async () => {
  expect.assertions(1);
  const data = await gigBookingFunctions.addGigBooking();
  expect(data).toEqual(true);
});

test('get gig booking test', async () => {
  expect.assertions(1);
  const data = await gigBookingFunctions.getGigBooking();
  expect(data).toEqual(true);
});

test('delete gig booking test', async () => {
  expect.assertions(1);
  const data = await gigBookingFunctions.deleteGigBooking();
  expect(data).toEqual(true);
});

//test for message manipulation
test('add message test', async () => {
  expect.assertions(1);
  const data = await messageFunctions.addMessage();
  expect(data).toEqual(true);
});

test('get message test', async () => {
  expect.assertions(1);
  const data = await messageFunctions.getMessage();
  expect(data).toEqual(true);
});


test('delete message test', async () => {
  expect.assertions(1);
  const data = await messageFunctions.deleteMessage();
  expect(data).toEqual(true);
});