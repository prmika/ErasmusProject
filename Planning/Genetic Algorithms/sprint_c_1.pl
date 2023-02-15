% Tasks (Id, processing time, deadline, weight penalty)
task(t1,2,5,1).
task(t2,4,7,6).
task(t3,1,11,2).
task(t4,3,9,3).
task(t5,3,8,2).

% Number of tasks
tasks(5).

% Initialize parameters
initialize:-write('Number of new generations: '),read(NG),
    (retract(generations(_));true),assertz(generations(NG)),
    write('Population dimensity: '),read(DP),
    (retract(population(_));true),assertz(population(DP)), % population dimension
    write('Probability of Crossover(%): '),read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_crossover(_));true),assertz(prob_crossover(PC)),
    write('Probablility of Mutation(%): '),read(P2), % mutation probability
    PM is P2/100,
    (retract(prob_mutation(_));true),assertz(prob_mutation(PM)).

generate:-
    initialize,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopEv),
    write('PopEv='),write(PopEv),nl,
    order_population(PopEv,PopOrd),
    generations(NG),
    generate_generation(0,NG,PopOrd).

generate_population(Pop):-
    population(TamPop),
    tasks(NumT),
    findall(Task,task(Task,_,_,_),ListTasks),
    generate_population(TamPop,ListTasks,NumT,Pop).

generate_population(0,_,_,[]):-!.
generate_population(TamPop,ListTasks,NumT,[Ind|Rest]):-
    TamPop1 is TamPop - 1,
    generate_population(TamPop1,ListTasks,NumT,Rest),
    generate_individual(ListTasks,NumT,Ind),
    not(member(Ind,Rest)).
generate_population(TamPop,ListTasks,NumT,L):-
    generate_population(TamPop,ListTasks,NumT,L).

generate_individual([G],1,[G]):-!.
generate_individual(ListTasks,NumT,[G|Rest]):-
    NumTemp is NumT + 1, % to use with random
    random(1,NumTemp,N),
    remove(N,ListTasks,G,NewList),
    NumT1 is NumT - 1,
    generate_individual(NewList,NumT1,Rest).

remove(1,[G|Rest],G,Rest).
remove(N,[G1|Rest],G,[G1|Rest1]):-N1 is N - 1,
    remove(N1,Rest,G,Rest1).

evaluate_population([],[]).
evaluate_population([Ind|Rest],[Ind*V|Rest1]):-
    evaluate(Ind,V),
    write(Ind),nl,
    evaluate_population(Rest,Rest1).

evaluate(Seq,V):-evaluate(Seq,0,V).

evaluate([],_,0).
evaluate([T|Rest],Inst,V):-
    task(T,Dur,Dline,Pen),
    InstEnd is Inst + Dur,
    evaluate(Rest,InstEnd,VRest),
    ((InstEnd =< Dline,!,VT is 0);(VT is (InstEnd - Dline)*Pen)),
    V is VT + VRest.

order_population(PopEv,PopEvOrd):-
    bsort(PopEv,PopEvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    bexchange([X|Zs],Ys).

bexchange([X],[X]):-!.
bexchange([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX > VY,!,
    bexchange([X*VX|L1],L2).

bexchange([X|L1],[X|L2]):-bexchange(L1,L2).

generate_generation(G,G,Pop):-!,
    write('Generation '),write(G),write(':'),nl,write(Pop),nl.
generate_generation(N,G,Pop):-
    write('Generation '),write(N),write(':'),nl,write(Pop),nl,
    crossover(Pop,NPop1),
    mutation(NPop1,NPop),
    evaluate_population(NPop,NPopEv),
    order_population(NPopEv,NPopOrd),
    N1 is N + 1,
    generate_generation(N1,G,NPopOrd).

generate_crossover_points(P1,P2):-generate_crossover_points1(P1,P2).
generate_crossover_points1(P1,P2):-
    tasks(N),
    NTemp is N + 1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11 \== P21,!,
    ((P11 < P21,!,P1 = P11,P2 = P21);P1 = P21,P2 = P11).
generate_crossover_points1(P1,P2):-
    generate_crossover_points1(P1,P2).

crossover([],[]).
crossover([Ind*_],[Ind]).
crossover([Ind1*_,Ind2*_|Rest],[NInd1,NInd2|Rest1]):-
    generate_crossover_points(P1,P2),
    prob_crossover(Pcross),random(0.0,1.0,Pc),
    ((Pc =< Pcross,!,
  crosses(Ind1,Ind2,P1,P2,NInd1),
      crosses(Ind2,Ind1,P1,P2,NInd2));
      (NInd1 = Ind1,NInd2 = Ind2)),
      crossover(Rest,Rest1).

preencheh([],[]).
preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).

sublist(L1,I1,I2,L):-I1 < I2,!,
    sublist1(L1,I1,I2,L).
sublist(L1,I1,I2,L):-sublist1(L1,I2,I1,L).

sublist1([X|R1],1,1,[X|H]):-!,preencheh(R1,H).
sublist1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1,
    sublist1(R1,1,N3,R2).
sublist1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
    N4 is N2 - 1,
    sublist1(R1,N3,N4,R2).

rotate_right(L,K,L1):-tasks(N),
    T is N - K,
    rr(T,L,L1).

rr(0,L,L):-!.
rr(N,[X|R],R2):-N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).

eliminate([],_,[]):-!.
eliminate([X|R1],L,[X|R2]):-not(member(X,L)),!,
    eliminate(R1,L,R2).
eliminate([_|R1],L,R2):-
    eliminate(R1,L,R2).

insert([],L,_,L):-!.
insert([X|R],L,N,L2):-
    tasks(T),
    ((N > T,!,N1 is N mod T);N1 = N),
    insert1(X,N1,L,L1),
    N2 is N + 1,
    insert(R,L1,N2,L2).

insert1(X,1,L,[X|L]):-!.
insert1(X,N,[Y|L],[Y|L1]):-
    N1 is N - 1,
    insert1(X,N1,L,L1).

crosses(Ind1,Ind2,P1,P2,NInd11):-
    sublist(Ind1,P1,P2,Sub1),
    tasks(NumT),
    R is NumT - P2,
    rotate_right(Ind2,R,Ind21),
    eliminate(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insert(Sub2,Sub1,P3,NInd1),
    eliminateh(NInd1,NInd11).

eliminateh([],[]).
eliminateh([h|R1],R2):-!,
    eliminateh(R1,R2).
eliminateh([X|R1],[X|R2]):-
    eliminateh(R1,R2).

mutation([],[]).
mutation([Ind|Rest],[NInd|Rest1]):-
    prob_mutation(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutation1(Ind,NInd));NInd = Ind),
    mutation(Rest,Rest1).

mutation1(Ind,NInd):-
    generate_crossover_points(P1,P2),
    mutation22(Ind,P1,P2,NInd).

mutation22([G1|Ind],1,P2,[G2|NInd]):-!,
    P21 is P2 - 1,
    mutation23(G1,P21,Ind,G2,NInd).
mutation22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1 - 1, P21 is P2 - 1,
    mutation22(Ind,P11,P21,NInd).

mutation23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutation23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P - 1,
    mutation23(G1,P1,Ind,G2,NInd).
