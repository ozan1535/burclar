export default function notFound(req, res) {
  res.status(404).json({
    message: "Üzgünüz, aradığınız adres bulunamadı.",
    path: req.originalUrl,
    status: 404,
    success: false,
  });
}
