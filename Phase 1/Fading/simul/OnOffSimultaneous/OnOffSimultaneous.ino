int currVal[] = { 0, 0 };
int reqVal[] = { 0, 0 };
int pins[] = {5, 4};

void setup()
{
  for (int i = 0; i < 2; i++)
  {
    pinMode(pins[i], OUTPUT);
  }
}

void doChange()
{
  for (int i = 0; i < 2; i++)
  {
    if (currVal[i] > reqVal[i])
    {
      currVal[i]--;
      analogWrite(pins[i], currVal[i]);
    }
    else if (currVal[i] < reqVal[i])
    {
      currVal[i]++;
      analogWrite(pins[i], currVal[i]);
    }
  }
}

void setPinAsync(int index, int val)
{
  reqVal[index] = val;
}

void transition()
{
  if (currVal[0] == reqVal[0])
  {
    if (currVal[0] == 0)
    {
      setPinAsync(0, 1000);
    }
    else setPinAsync(0, 0);
  }

  if (currVal[1] == reqVal[1])
  {
    if (currVal[1] == 0)
    {
      setPinAsync(1, 500);
    }
    else setPinAsync(1, 0);
  }
}


void loop()
{

  transition();
  doChange();

  delay(1);
}
