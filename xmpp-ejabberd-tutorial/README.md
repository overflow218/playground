// 아쉽게도 저 도커이미지가 amd로 밖에 없어서 m1 맥에선 안돌아감
// 도커로 우분투 받아서 거기서 돌려도 되긴한데 귀찮아서 방법만 봐두기  
docker run --name ejabberd -p 5222:5222

//도커로 돌린후에 유저 등록하기
docker exec -it ejabberd bin/ejabberdctl register admin localhost password
docker exec -it ejabberd bin/ejabberdctl register hj localhost password
docker exec -it ejabberd bin/ejabberdctl register 유저이름 호스트의 아이피주소 비밀번호 형식임
