var myth_buster;
var content;

$(document).ready(initialize);

function initialize() {
  loadContent();
}

function loadContent() {
  myth_buster = $.QueryString['mb'];
  content = $('<div></div>');
  if (myth_buster) {
    content.load(
      'generated/' + myth_buster.toLowerCase() + '_myth_buster.html',
      setInitialContent);
  }
}

function setInitialContent() {
  setTitle();
  intro();
}

function setTitle() {
  document.title = content.find('.meta .title').text();
}

function intro() {
  setContent(content.find('.intro'));
  setStartNav();
  setMoreInfoNav(-1, null);
}

function question(index) {
  setContent(questions().eq(index));
  setNavForQuestion(index);
}

function explanation(questionIndex) {
  setContent(explanations().eq(questionIndex));
  setNavForExplanation(questionIndex)
}

function setContent(element) {
  $('#myth-buster').empty().append(element.clone());
}

function setStartNav() {
  $('.start').click(start);
}

function setMoreInfoNav(questionIndex, returnAction) {
  $('.more-info').click(
    function() { moreInfo(questionIndex, returnAction) });
}

function questions() {
  return content.find('.questions .question');
}

function setNavForQuestion(questionIndex) {
  setSkipNav(questionIndex);
  setAnswerNav(questionIndex);
  setMoreInfoNav(questionIndex, question);
}

function explanations() {
  return content.find('.questions .explanation');
}

function setNavForExplanation(questionIndex) {
  setSkipNav(questionIndex);
  setMoreInfoNav(questionIndex, explanation);
}

function setSkipNav(questionIndex) {
  if (questionIndex > 0)
    $('.previous').click(function() { question(questionIndex-1); });
  if (questionIndex < lastQuestionIndex())
    $('.next').click(function() { question(questionIndex+1); });
}

function setAnswerNav(questionIndex) {
  $('.true').click(function() { answerQuestion(questionIndex, $(this)); });
  $('.false').click(function() { answerQuestion(questionIndex, $(this)); });
}

function start() {
  question(0);
}

function moreInfo(questionIndex, returnAction) {
  setContent(content.find('div.more-info'));
  if (questionIndex < 0)
    $('.back').click(intro);
  else
    $('.back').click(function() { returnAction(questionIndex) });
}

function answerQuestion(questionIndex, answer) {
  correct = answer.is($('.correct'));
  // TODO: replace alert with something less intrusive
  alert(correct ? correctMessage() : incorrectMessage());
  explanation(questionIndex);
}

function correctMessage() {
  return ' :-) ';
}

function incorrectMessage() {
  return ' :-( ';
}

function lastQuestionIndex() {
  return questions().size() - 1;
}
