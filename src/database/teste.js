const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir Dados
    proffyValue = {
        name: 'Rick Sanchez',
        avatar: 'https://cdn.imgbin.com/24/3/14/imgbin-rick-sanchez-pocket-mortys-morty-smith-rick-and-morty-season-3-meeseeks-and-destroy-others-ByZ1x7hMUSmMfFPwr3NY1xXA4.jpg',
        whatsapp: '997343377',
        bio: 'Eu sou um Deus',
    }   

    classValue = {
        subject: 1,
        cost: "9000000",
        //o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastrada a class
        {
            weekday: 2,
            time_from: 720,
            time_to: 1220,
        },

        {
            weekday: 0,
            time_from: 520,
            time_to: 1220,
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar os Dados Inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)
    
    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    //o horário do time_from(8h) precisa ser menor ou igual ao horário solicitado
    //o time_to precisa ser acima do horário do horário
    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    //console.log(selectClassesSchedule)
})