const midtransClient = require("midtrans-client");
const OrderKelas = require('../models/order-kelas');

exports.getClassOrder = async function(req, res, next) {
  try {

    const data = await OrderKelas.find();
    
    res.json({
      status: true,
      pesan: 'berhasil tampil',
      data: data
    });
  } catch (err) {
    res.json({
      status: false,
      pesan: 'gagal tampil: ' + err.message,
      data: [],
      orderData: []
    });
  }
};

exports.payment = async function(req, res, next) {

  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey : 'YOUR_SERVER_KEY',
    clientKey : 'YOUR_CLIENT_KEY'
  });

  try {
    const transactionToken = await snap.createTransactionToken(req.body);

    const dataOrder = {
      fullName: req.body.fullName,
      email: req.body.email,
      noPhone: req.body.noPhone,
      birthPlace: req.body.birthPlace,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      school: req.body.school,
      instagram: req.body.instagram,
      address: req.body.address,
      userId: req.body.userId,
      motivation: req.body.motivation,
      portfolioFile: req.body.portfolioFile,
      portfolioUrl: req.body.portfolioUrl,
      transactionToken: transactionToken
    };
    

    const data = await OrderKelas.create(dataOrder);

    res.json({
      status: true,
      pesan: "Berhasil Order",
      token: transactionToken,
      data: data
    });

    return { token: transactionToken.token };

  } catch (err) {
    res.json({
      status: false,
      pesan: "Gagal Order: " + err.message,
      data: []
    });
  }


};
