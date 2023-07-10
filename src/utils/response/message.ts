const message = {
  // status 200
  '0000': '성공',
  '0001': '회원을 찾을 수 없습니다.',
  '0002': '지급할 쿠폰을 찾을 수 없습니다.',
  '0003': '쿠폰을 지급할 회원이 없습니다.',
  '0004': '비밀번호가 일치하지 않습니다.',

  // status 400
  '4000': '파라미터 유효성 검증 실페',

  // status 401
  '8999': '토큰 형식이 올바르지 않습니다.',
  '8998': '토큰 type이 올바르지 않습니다.',
  '8997': '토큰으로 회원을 찾을 수 없습니다.',
  '8996': '탈퇴한 회원입니다.',

  // status 409

  // status 500
  '9999': '서버오류',
};

export default message;
