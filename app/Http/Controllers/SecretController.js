class SecretController {
  success = (_, res) => {
    return res.status(200).json({ message: "Client Authorization check successfully done." });
  }
}

module.exports = new SecretController();
