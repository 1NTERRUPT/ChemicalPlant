# define red_motor     7
# define green_motor   6
# define blue_motor    5
int i,j,t,X=0,Y=0,Z=0;
int ser_1[3];
int po(int,int);
short flg1=0,flg2=0,flg3=0,button=0;
void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
  pinMode(red_motor,OUTPUT); // BLUE LED
  pinMode(green_motor,OUTPUT); // GREEN LED 
  pinMode(blue_motor,OUTPUT);
}

void loop() 
{
 if(Serial.available())
  {
    //ser_1[i]=Serial.read();
    char ch = Serial.read();
     if(ch=='R')
       { i=0;
         X=0;
         while(1)
         {
            if (Serial.available() > 0)
           {
           ser_1[i]=Serial.read(); 
          if(ser_1[i]=='T') 
          {
            flg1=1;
            break;
          }
         else if(ser_1[i]=='F') 
          {
            flg1=0;
            break;
          }
          else
          {
           ser_1[i]=ser_1[i]-48;       
           X=X+(ser_1[i]*(po(10,i)));
            
           i++;
           if(i==3)
           {
             button=1;
           break;
           }  
         }
           
           }
         }
         Serial.println(X);
       }
    if(ch=='G')
       { i=0;
         Y=0;
         //flg=0;
         while(1)
         {
            if (Serial.available() > 0)
           {
           ser_1[i]=Serial.read(); 
           if(ser_1[i]=='T') 
          {
            flg2=1;
            break;
          }
         else if(ser_1[i]=='F') 
          {
            flg2=0;
            break;
          }
          else
          {
           ser_1[i]=ser_1[i]-48;       
           Y=Y+(ser_1[i]*(po(10,i)));
          
           i++;
           if(i==3)
           {
             button=1;
           break;
           }  
           }
         }

         }
               
         Serial.println(Y);  
          
       }
     if(ch=='B')
       { i=0;
         Z=0;
         //flg=0;
         while(1)
         {
            if (Serial.available() > 0)
           {
           ser_1[i]=Serial.read(); 
        if(ser_1[i]=='T') 
          {
            flg3=1;
            break;
          }
         else if(ser_1[i]=='F') 
          {
            flg3=0;
            break;
          }
          else
          {
           ser_1[i]=ser_1[i]-48;       
           Z=Z+(ser_1[i]*(po(10,i)));
           i++;
           if(i==3)
            {
             button=1;
             break;
            }  
           }
         }

         }
            Serial.println(Z); 

       }  
      } 

if(flg1==1)
{
digitalWrite(red_motor,HIGH);
}
//if(flg1==0)
//{
// digitalWrite(11,LOW);
//}
else if(flg2==1)
{
 digitalWrite(green_motor,HIGH);
}
//if(flg2==0)
//{
//  digitalWrite(12,LOW);
//}
else if(flg3==1)
{
  digitalWrite(blue_motor,HIGH);
}
//if(flg3==0)
//{
//  digitalWrite(13,LOW);
//}
 else if(button==1)
  {
    digitalWrite(blue_motor,LOW);
    digitalWrite(green_motor,LOW);
    digitalWrite(red_motor,LOW);
    digitalWrite(red_motor,HIGH);
    delay(X*100);
    digitalWrite(red_motor,LOW);
    digitalWrite(green_motor,HIGH);
    delay(Y*100);
    digitalWrite(green_motor,LOW);
    digitalWrite(blue_motor,HIGH);
    delay(Z*100);
    digitalWrite(blue_motor,LOW);
    X=0;
    Y=0;
    Z=0;
    button=0;
  } 
  else
  {
    digitalWrite(blue_motor,LOW);
    digitalWrite(green_motor,LOW);
    digitalWrite(red_motor,LOW);
  }
}
////*********************po*****************************************************/
int po(int num,int pow)
{  int result=1;
  if(pow==0)
  return 1;
  else
  {
  for(int f=1;f<=pow;f++)
    {
   result=result*num;

    }
  return result;
  }
}
