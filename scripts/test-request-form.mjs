#!/usr/bin/env node
/**
 * Скрипт ручного тестирования API-формы заявки.
 * Запуск: node scripts/test-request-form.mjs
 * Требует работающего dev-сервера: npm run dev
 */

// Node 18+ has built-in fetch, FormData

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

async function testNormalSubmission() {
  console.log('\n=== Тест 1: Обычная заявка (имя + телефон + email) ===');

  const formData = new FormData();
  formData.append('name', 'Тестовый Клиент');
  formData.append('phone', '+7 999 123-45-67');
  formData.append('email', 'qa@example.com');
  formData.append('comment', 'Тестовая заявка через скрипт. QA check.');
  formData.append('website', ''); // honeypot empty

  const response = await fetch(`${BASE_URL}/api/request`, {
    method: 'POST',
    body: formData,
  });

  const json = await response.json();
  console.log(`  HTTP статус: ${response.status}`);
  console.log(`  Ответ:`, JSON.stringify(json, null, 2));

  if (json.previewUrl) {
    console.log(`\n  ✓ Ethereal Preview URL: ${json.previewUrl}`);
  }

  if (response.ok && json.success) {
    console.log('  РЕЗУЛЬТАТ: ✓ УСПЕХ');
  } else {
    console.log('  РЕЗУЛЬТАТ: ✗ ОШИБКА');
    process.exitCode = 1;
  }
}

async function testHoneypot() {
  console.log('\n=== Тест 2: Спам через honeypot ===');

  const formData = new FormData();
  formData.append('name', 'Bot Name');
  formData.append('phone', '+7 000 000-00-00');
  formData.append('product', 'Пошив промо-одежды');
  formData.append('website', 'http://spam.example.com'); // honeypot filled

  const response = await fetch(`${BASE_URL}/api/request`, {
    method: 'POST',
    body: formData,
  });

  const json = await response.json();
  console.log(`  HTTP статус: ${response.status}`);
  console.log(`  Ответ:`, JSON.stringify(json, null, 2));

  // Should return success but NOT send email
  if (json.success) {
    console.log('  РЕЗУЛЬТАТ: ✓ Honeypot сработал (success без отправки)');
  } else {
    console.log('  РЕЗУЛЬТАТ: ✗ Ожидался success-ответ для honeypot');
    process.exitCode = 1;
  }
}

async function testValidationErrors() {
  console.log('\n=== Тест 3: Валидация — пустые обязательные поля (имя и телефон) ===');

  const formData = new FormData();
  formData.append('email', 'test@test.com');
  // name, phone — не заполнены (email необязательный)

  const response = await fetch(`${BASE_URL}/api/request`, {
    method: 'POST',
    body: formData,
  });

  const json = await response.json();
  console.log(`  HTTP статус: ${response.status}`);
  console.log(`  Ответ:`, JSON.stringify(json, null, 2));

  if (response.status === 400 && !json.success) {
    console.log('  РЕЗУЛЬТАТ: ✓ Валидация работает (400 + сообщение об ошибке)');
  } else {
    console.log('  РЕЗУЛЬТАТ: ✗ Ожидалась ошибка валидации');
    process.exitCode = 1;
  }
}

async function main() {
  console.log(`\nTEEON API Form Test Script`);
  console.log(`BASE_URL: ${BASE_URL}`);
  console.log(`Время: ${new Date().toLocaleString('ru-RU')}`);

  try {
    await testNormalSubmission();
    await testHoneypot();
    await testValidationErrors();
  } catch (err) {
    console.error('\n✗ Ошибка подключения к серверу:', err.message);
    console.error('Убедитесь, что dev-сервер запущен: npm run dev');
    process.exitCode = 1;
  }

  console.log('\n=== Тестирование завершено ===\n');
}

main();
