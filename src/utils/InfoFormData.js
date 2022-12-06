export const userData = [
    {
        name: "name",
        label: "Ім'я*",
    },
    {
        name: "secondName",
        label: "Прізвище*",
    },
    {
        name: "instagram",
        label: "Ваш інстаграм*",
    },
    {
        name: "phone",
        label: "Телефон*",
    },
    {
        name: "email",
        label: "Email*",
    },
];
export const deliveryDataOne = [
    {
        name: "region",
        label: "Область*",
        disabled: true
    },
    {
        name: "town",
        label: "Місто*",
        disabled: false
    },
]
export const deliveryDataTwo = [
    {
        name: "postOffice",
        label: ["Відділення нової пошти*","Індекс Укрпошти"],
        disabled: false
    },
    {
        name: "note",
        label: ["Примітки...","Примітки..."],
        disabled: false
    },
]