const handleSignin = (req, res, db, bcrypt) => {

        var d = new Date();
        const {password , email} = req.body;
        if (!email || !password) {
          return res.status(400).render('signin', {year: d.getFullYear(), error: true, message: 'incorrect form submission'});
        }
        db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            console.log(data[0])
          const isValid = bcrypt.compareSync(password, data[0].hash);
          console.log(isValid)
          if (isValid) {
            return db.select('*').from('doctors')
              .then(doctor => {
                console.log(doctor)
                res.render("f", {doctor: doctor});
              })
              .catch(err => res.status(400).render('signin', {year: d.getFullYear(), error: true, message: 'unable to get user'}))
          } else {
            res.status(400).render('signin', {year: d.getFullYear(), error: true, message: 'Wrong Credentials'})
          }
        })
        .catch(err => res.status(400).render('signin', {year: d.getFullYear(), error: true, message: 'Wrong Credentials'}))
}

module.exports = {
    handleSignin: handleSignin
}