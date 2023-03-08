// importing axios
const axios = require('axios');


//url for api
const apiUrl = 'http://dev.ehealthier.com.au/api';


//test case 1
    describe('POST /login', () => {
        it('should return 200 with auth token if user exists and is activated', async () => {
            const user = { email: 'user@example.com', 
            password: 'string',
            token: "000000000000000000000000-00-00-00-00-00-00-00-00"
        };

        try {
            const response = await axios.post(`${apiUrl}/login`, user);
            expect(response.status).toEqual(200);
            expect(response.data.token).toBeDefined();
        } catch (error) {
            console.log(error.response.data);
        }

        });
    });

  //test case 2 
    describe('POST /login', () => {
        it('should return 200 with a message "Your account is not currently active" if user exists and is not activated', async () => {
            const user = { email: 'user@example.com', 
            password: 'string',
            token: "000000000000000000000000-00-00-00-00-00-00-00-00"
        };

        try {
            const response = await axios.post(`${apiUrl}/login`, user);
            expect(response.status).toEqual(200);
            expect(response.data.token).toBeDefined();
            expect(error.response.data.message).toEqual("Your account is not currently active");
        } catch (error) {
            console.log(error.response.data);
        }
        
        });
    });

  //test case 3
  describe('POST /login', () => {
    it('should return 404 if user does not exist', async () => {
      const user = { email: 'nonexistinguser@example.com', password: 'password123' };
  
      try {
        await axios.post(`${apiUrl}/login`, user);
        expect(error.response.status).toEqual(404);
        expect(error.response.data.error).toBeDefined();
        expect(error.response.data.error.message).toEqual('User not found');
      } catch (error) {
        console.log(error.response.data);
      }
    });
  });

  // test case 4 
  describe('POST /users', () => {
            it('should create a new user and return 200', async () => {
            // Define the user payload to send in the request
            
            const userPayload = {
                    firstName: "string",
                    lastName: "string",
                    email: "user@example.com",
                    phone: "string",
                    medicareNumber: "string",
                    ihi: "string",
                    role: 7,
                    title: "",
                    
            };
        
            // Send the POST request to create the new user
            const response = await axios.post('http://dev.ehealthier.com.au/api/users', userPayload);
        
            // Verify the response status code is 200
            expect(response.status).toEqual(200);
        
            // Verify the response data contains the newly created user object
            expect(response.data.user).toBeDefined();
            expect(response.data.token).toBeDefined();
            expect(response.data.user.firstName).toEqual('string');
            expect(response.data.user.lastName).toEqual('string');
            expect(response.data.user.email).toEqual('user@example.com');
            expect(response.data.user.phone).toEqual('string');
            expect(response.data.user.medicareNumber).toEqual('string');
            expect(response.data.user.ihi).toEqual('string');
            expect(response.data.user.role).toEqual(7);
            expect(response.data.user.title).toEqual('');


            });
  });


  // test case 5
  describe('PUT /users/{id}', () => {
        let user;
        let originalLastName;
    
        beforeAll(async () => {
        const newUser = {
            firstName: "string",
            lastName: "string",
            phone: "string",
            medicareNumber: "string",
            ihi: "string",
            title: "",
        };
    
        const response = await axios.post(`${apiUrl}/users`, newUser);
        user = response.data.user;
    
        originalLastName = user.lastName;
        });
    
        afterAll(async () => {
        if (user) { // add check for undefined user
            user.lastName = originalLastName;
            await axios.put(`${apiUrl}/users/${user.id}`, user, {
            headers: { Authorization: `Bearer ${token}` },
            });
        }
        });
    
        it('should update the user last name and return 200', async () => {
        user.lastName = 'Zeeshan';
        const response = await axios.put(`${apiUrl}/users/${user.id}`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });
    
        expect(response.status).toEqual(200);
    
        expect(response.data.user.lastName).toEqual('Zeeshan');
        });
    
        it('should update the user last name back to its original value and return 200', async () => {
        const response = await axios.put(`${apiUrl}/users/${user.id}`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });
    
        expect(response.status).toEqual(200);
    
        expect(response.data.user.lastName).toEqual(originalLastName);
        });
  });
  
  
  