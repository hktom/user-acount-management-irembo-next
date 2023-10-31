## User Account Management Plateforme Z

Company Z provides essential online services for tens of thousands of users through their
platform ZPlatform.

<img src="https://res.cloudinary.com/diaylgu7a/image/upload/v1698735841/Screenshot_2023-10-31_at_08.02.59_k7axio.png">

### Installation

1. Clone this repository : git clone https://github.com/hktom/user-acount-management-irembo-next.git
2. Execute : cd user-acount-management-irembo-next

#### First installation
1. Execute : docker-compose up -d --build

#### If you have already installed the application
1. Execute : docker-compose up -d to start the application
2. Execute : docker-compose down to stop the application

#### Usage
1. Access the application via http://localhost:3000

### Testing

1. You can test the application by running : docker-compose exec yarn test
2. You can see the coverage by running : docker-compose exec yarn test --coverage