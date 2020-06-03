/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const logger = require('../util/logger');

const FORMS_PATH = path.join(__dirname, '../../form-descriptors');

exports.getForms = (req, res) => {
  logger.logger.info({
    message: 'test get forms',
  });
  const all_forms = fs.readdirSync(FORMS_PATH);
  const result = all_forms.map((item) => {
    try {
      const form = fs.readFileSync(path.join(FORMS_PATH, item));
      const form_desc = JSON.parse(form);
      return {
        form: form_desc,
      };
    } catch (err) {
      logger.logger.error('Error while reading form files : ', err);
      return {};
    }
  });
  console.log(result);
  res.send(result);
};

exports.getFormsById = (req, res) => {
  logger.logger.info({
    message: `GET forms with id : ${req.params}`,
  });
  let result = null;
  const { formId } = req.params;
  const all_forms = fs.readdirSync(FORMS_PATH);
  all_forms.forEach((item) => {
    try {
      const form = fs.readFileSync(path.join(FORMS_PATH, item));
      const form_desc = JSON.parse(form);
      if (form_desc.id === formId) {
        result = form_desc;
      }
    } catch (err) {
      logger.logger.error('Error while reading form files : ', err);
    }
  });

  if (result == null) {
    logger.logger.error('Requested form not found : ');
    res.status(404);
  } else {
    res.status(200).json(result);
  }
};

exports.postFormsById = (req, res) => {
  console.log(req.path);
  console.log(req.params);
  logger.logger.info({
    message: `POST forms with id : ${req.params.formId}`,
  });
  res.status(200).send({ status: '200', ...req.body });
};