const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  const data = req.body;
  if (!(req.body.name != null && data.price != null)) {
    res.status(400).json({
      message: 'you have entered insufficent data',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is : ${val}`);
  if (val * 1 > tours.length) {
    return res.status(404).json({
      reslult: 'the given id is bigger than the tours length ',
      data: { message: 'you should try to delete something with lwss id' },
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    results: tours.length,
    requestTime: req.requestTime,
    data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  //? sondaki id paremetresi ile client tarafından yollanacak parametereleri yakalayarak client istegine
  //? uygun donutler yollayaabiliriz
  const selectedTour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    result: 'ok',
    data: { selectedData: selectedTour },
  });
};

exports.saveTour = (req, res) => {
  console.log('***************************** *** **************************');
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      if (error != null) {
        res.send(`the file has been saved the error is : \n${error}`);
      } else {
        res.status(201).json({
          results: 'missionCmpleted',
          data: { addedData: newTour, allTours: tours },
        });
      }
    }
  );
};

exports.patchTour = (req, res) => {
  res.status(200).json({
    result: 'The patch result is ok',
    data: { message: 'mission completed' },
  });
};

exports.deleteTour = (req, res) => {
  //* if (req.params.id * 1 > tours.length) {
  //*     res.status(404).json({
  //*         reslult: 'the given id is bigger than the tours length ',
  //*         data: { message: 'you should try to delete something with lwss id' }
  //*     })
  //* }

  res.status(204).json({
    result: ' the process is completed',
    data: 'the given tour deleted',
  });
};
