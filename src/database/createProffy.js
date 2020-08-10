module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    //inserir dados na tabela de teachers
    const insertProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertProffy.lastID

    //Inserir dados na tabela de classes
    const insertedClasses = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClasses.lastID

    //inserir dados na tabela Class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            )
        `)
    })

    // aqui vai executar todos os db.run's'() das class_schedule
    await Promise.all(insertedAllClassScheduleValues)
}